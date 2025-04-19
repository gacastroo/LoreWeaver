import prisma from '../lib/prisma.js';
import { getUserIdFromToken } from '../utils/auth.js';

// 🔹 Obtener todos los tags del usuario
export const obtenerTags = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);

  try {
    const tags = await prisma.tags.findMany({
      where: {
        historia: {
          usuarioId,
        },
      },
      include: {
        historia: {
          select: { titulo: true },
        },
        personajes: {
          include: {
            personaje: {
              select: { nombre_personaje: true },
            },
          },
        },
      },
    });

    res.json(tags);
  } catch (error) {
    console.error("❌ Error al obtener tags:", error);
    res.status(500).json({ error: "Error al obtener tags" });
  }
};

// 🔹 Eliminar un tag si pertenece a historia del usuario
export const eliminarTag = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const tag = await prisma.tags.findFirst({
      where: {
        id_Tag: parseInt(id),
        historia: {
          usuarioId,
        },
      },
    });

    if (!tag) {
      return res.status(403).json({ error: "No tienes permiso para eliminar este tag" });
    }

    await prisma.tags.delete({
      where: { id_Tag: parseInt(id) },
    });

    res.json({ message: "Tag eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar tag:", error);
    res.status(500).json({ error: "Error al eliminar tag" });
  }
};
