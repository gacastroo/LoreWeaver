import prisma from "../lib/prisma.js";
import { getUserIdFromToken } from "../utils/auth.js";

// 🔹 Crear universo si la historia pertenece al usuario
export const crearUniverso = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { titulo_universo, historiaId } = req.body;

  try {
    const historia = await prisma.historia.findFirst({
      where: {
        id: parseInt(historiaId),
        usuarioId: userId,
      },
    });

    if (!historia) {
      return res.status(403).json({ error: "No tienes permiso para agregar universos a esta historia." });
    }

    const universo = await prisma.universo.create({
      data: {
        titulo_universo,
        historiaId: historia.id,
      },
    });

    res.status(201).json(universo);
  } catch (error) {
    console.error("❌ Error al crear universo:", error);
    res.status(500).json({ error: "Error al crear universo" });
  }
};

// 🔹 Obtener universos por usuario (según sus historias)
export const obtenerUniversos = async (req, res) => {
  const userId = getUserIdFromToken(req);

  try {
    const universos = await prisma.universo.findMany({
      where: {
        historia: {
          usuarioId: userId,
        },
      },
      include: {
        historia: {
          select: { titulo: true },
        },
      },
    });

    res.json(universos);
  } catch (error) {
    console.error("❌ Error al obtener universos:", error);
    res.status(500).json({ error: "Error al obtener universos" });
  }
};
