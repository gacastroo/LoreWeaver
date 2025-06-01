import express from "express";
import prisma from "../lib/prisma.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const userId = req.usuario.id;

    const stories = await prisma.historia.count({
      where: { usuarioId: userId }
    });

    const characters = await prisma.personaje.count({
      where: { usuarioId: userId }
    });

    const chapters = await prisma.capitulo.count({
      where: { historia: { usuarioId: userId } }
    });

    const scenes = await prisma.escena.count({
      where: { historia: { usuarioId: userId } }
    });

    const universes = await prisma.universo.count({
      where: { usuarioId: userId }
    });

    const tags = await prisma.tags.count({
      where: { historia: { usuarioId: userId } }
    });

    const recentStories = await prisma.historia.findMany({
      where: { usuarioId: userId },
      take: 3,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        titulo: true,
        updatedAt: true
      },
    });

    const activity = [
      { text: "Nuevo personaje creado: Carrie White", time: "Hace 3 horas" },
      { text: "Nueva historia añadida: Speak", time: "Hace 1 día" }
    ];

    res.json({
      stories,
      characters,
      chapters,
      scenes,
      universes,
      tags,
      words: 0,
      recentStories: recentStories.map((h) => ({
        id: h.id,
        title: h.titulo,
        genre: "Desconocido",
        updated: new Date(h.updatedAt).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      })),
      activity
    });

  } catch (err) {
    console.error("❌ Error al cargar dashboard:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
