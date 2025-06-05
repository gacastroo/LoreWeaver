import express from "express";
import prisma from "../lib/prisma.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const userId = req.usuario.id;

    const [stories, characters, chapters, scenes, universes] = await Promise.all([
      prisma.historia.count({ where: { usuarioId: userId } }),
      prisma.personaje.count({ where: { usuarioId: userId } }),
      prisma.capitulo.count({ where: { historia: { usuarioId: userId } } }),
      prisma.escena.count({ where: { historia: { usuarioId: userId } } }),
      prisma.universo.count({ where: { usuarioId: userId } }),
    ]);

    // 🔹 Obtener todos los personajes del usuario
    const personajesUsuario = await prisma.personaje.findMany({
      where: { usuarioId: userId },
      select: { id_Personaje: true },
    });
    const idsPersonajes = personajesUsuario.map(p => p.id_Personaje);

    // 🔹 Obtener IDs únicos de tags asociados a esos personajes
    const tagsAsociados = await prisma.personaje_Tag.findMany({
      where: { personajeId: { in: idsPersonajes } },
      select: { tagId: true },
      distinct: ['tagId'],
    });
    const tagIdsAsociados = tagsAsociados.map(t => t.tagId);

    // 🔹 Contar todos los tags del sistema que estén:
    //   - Asociados a personajes del usuario, o
    //   - Sueltos (sin personajes relacionados)
    const tags = await prisma.tags.count({
      where: {
        OR: [
          { id_Tag: { in: tagIdsAsociados } },
          { personajes: { none: {} } },
        ],
      },
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
