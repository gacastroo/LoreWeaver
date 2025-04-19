import express from "express";
import prisma from "../lib/prisma.js";
import { verificarToken } from '../middlewares/auth.js';


const router = express.Router();

router.get("/dashboard",verificarToken,  async (req, res) => {
  try {
    const stories = await prisma.historia.count();
    const characters = await prisma.personaje.count();
    const chapters = await prisma.capitulo.count();
    const scenes = await prisma.escena.count();
    const universes = await prisma.universo.count();
    const tags = await prisma.tags.count();

    const recentStories = await prisma.historia.findMany({
      take: 3,
      orderBy: { updatedAt: "desc" },
      select: {
        titulo: true,
        updatedAt: true
      },
    });

    res.json({
      stories,
      characters,
      chapters,
      scenes,
      universes,
      tags,
      words: 0, // Solo si tienes un campo tipo wordCount puedes calcularlo

      recentStories: recentStories.map((h) => ({
        title: h.titulo,
        genre: "Desconocido",
        updated: new Date(h.updatedAt).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      })),
      activity: [], // Por ahora vacío
    });
  } catch (err) {
    console.error("Error al cargar dashboard:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
