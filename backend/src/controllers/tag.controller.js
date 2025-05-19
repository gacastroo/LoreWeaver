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

// 🔹 Eliminar un tag si pertenece a una historia del usuario
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

// 🔹 Crear un nuevo tag
export const crearTag = async (req, res) => {
  console.log("🧠 REQ.USUARIO:", req.usuario);
  const { nombre_tag, historiaId } = req.body; // historiaId puede ser opcional
  const usuarioId = getUserIdFromToken(req);
  console.log("🔑 usuarioId extraído:", usuarioId);

  try {
    let tagData = {
      nombre_tag,
    };

    // Si historiaId se proporciona, verificar que la historia pertenezca al usuario
    if (historiaId) {
      const historia = await prisma.historia.findUnique({
        where: { id: historiaId },
        select: { usuarioId: true },
      });

      if (!historia || historia.usuarioId !== usuarioId) {
        return res.status(403).json({ error: "No tienes permiso para crear un tag en esta historia" });
      }

      tagData.historiaId = historiaId; // Asocia el tag con la historia
    }

    // Crear el tag
    const tag = await prisma.tags.create({
      data: tagData,
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error("❌ Error al crear tag:", error);
    res.status(500).json({ error: "Error al crear el tag" });
  }
};
