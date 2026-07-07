// backend/routes/writingGoals.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { verifyToken } = require("../middleware/auth"); // ajusta el path a tu middleware JWT

const prisma = new PrismaClient();

// Normaliza una fecha a medianoche UTC para comparaciones de día
function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function daysBetween(a, b) {
  const ms = Math.abs(startOfDay(a) - startOfDay(b));
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

// ── GET /api/writing-goals
// Devuelve el goal activo del usuario (o null si no tiene)
router.get("/", verifyToken, async (req, res) => {
  try {
    const goal = await prisma.writingGoal.findFirst({
      where: { userId: req.user.id },
      include: {
        sessions: {
          orderBy: { date: "desc" },
          take: 30, // últimas 30 sesiones para el calendario
        },
      },
    });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/writing-goals
// Crea o actualiza el goal del usuario
router.post("/", verifyToken, async (req, res) => {
  const { targetWords, storyId } = req.body;

  if (!targetWords || targetWords < 1) {
    return res.status(400).json({ error: "targetWords debe ser mayor que 0" });
  }

  try {
    const existing = await prisma.writingGoal.findFirst({
      where: { userId: req.user.id },
    });

    let goal;
    if (existing) {
      goal = await prisma.writingGoal.update({
        where: { id: existing.id },
        data: { targetWords, storyId: storyId || null },
      });
    } else {
      goal = await prisma.writingGoal.create({
        data: {
          userId: req.user.id,
          targetWords,
          storyId: storyId || null,
        },
      });
    }

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/writing-goals/session
// Registra palabras escritas en el día de hoy y actualiza la racha
router.post("/session", verifyToken, async (req, res) => {
  const { wordsWritten } = req.body;

  if (typeof wordsWritten !== "number" || wordsWritten < 0) {
    return res.status(400).json({ error: "wordsWritten inválido" });
  }

  try {
    const goal = await prisma.writingGoal.findFirst({
      where: { userId: req.user.id },
    });

    if (!goal) {
      return res.status(404).json({ error: "No tienes un objetivo activo. Crea uno primero." });
    }

    const today = startOfDay();

    // Upsert de la sesión de hoy (acumula palabras si ya existe)
    const existing = await prisma.writingSession.findUnique({
      where: { goalId_date: { goalId: goal.id, date: today } },
    });

    const newTotal = (existing?.wordsWritten || 0) + wordsWritten;
    const goalMet = newTotal >= goal.targetWords;

    const session = await prisma.writingSession.upsert({
      where: { goalId_date: { goalId: goal.id, date: today } },
      update: { wordsWritten: newTotal, goalMet },
      create: { goalId: goal.id, date: today, wordsWritten: newTotal, goalMet },
    });

    // ── Actualizar racha ──
    let newStreak = goal.currentStreak;
    const lastWritten = goal.lastWrittenAt ? startOfDay(goal.lastWrittenAt) : null;
    const diff = lastWritten ? daysBetween(today, lastWritten) : null;

    if (goalMet) {
      if (diff === null || diff === 0) {
        // Primera vez hoy o ya contado hoy → no cambiar racha todavía
        newStreak = goal.currentStreak || 1;
      } else if (diff === 1) {
        // Ayer cumplió → racha consecutiva
        newStreak = goal.currentStreak + 1;
      } else {
        // Rompió la racha
        newStreak = 1;
      }
    }

    const updatedGoal = await prisma.writingGoal.update({
      where: { id: goal.id },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(goal.longestStreak, newStreak),
        lastWrittenAt: goalMet ? today : goal.lastWrittenAt,
      },
    });

    res.json({ session, goal: updatedGoal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/writing-goals/stats
// Devuelve estadísticas y calendario de los últimos 30 días
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const goal = await prisma.writingGoal.findFirst({
      where: { userId: req.user.id },
      include: {
        sessions: {
          orderBy: { date: "desc" },
          take: 30,
        },
      },
    });

    if (!goal) return res.json(null);

    const today = startOfDay();
    const lastWritten = goal.lastWrittenAt ? startOfDay(goal.lastWrittenAt) : null;

    // Si el último día que cumplió fue hace más de 1 día, la racha se rompió
    let activeStreak = goal.currentStreak;
    if (lastWritten && daysBetween(today, lastWritten) > 1) {
      activeStreak = 0;
      await prisma.writingGoal.update({
        where: { id: goal.id },
        data: { currentStreak: 0 },
      });
    }

    res.json({
      targetWords: goal.targetWords,
      currentStreak: activeStreak,
      longestStreak: goal.longestStreak,
      sessions: goal.sessions.map((s) => ({
        date: s.date,
        wordsWritten: s.wordsWritten,
        goalMet: s.goalMet,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
