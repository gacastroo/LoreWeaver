import prisma from '../lib/prisma.js';
import { getUserIdFromToken } from '../utils/auth.js';

// 🔹 Obtener todos los tags creados por el usuario
export const obtenerTags = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);

  try {
    // ✅ Obtenemos los tags que pertenecen al usuario
    const tags = await prisma.tags.findMany({
      where: { usuarioId },
      include: {
        personajes: {
          include: {
            personaje: {
              select: { nombre_personaje: true, usuarioId: true },
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

// 🔹 Crear un nuevo tag para el usuario
export const crearTag = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);
  const { nombre_tag } = req.body;

  try {
    const tag = await prisma.tags.create({
      data: { 
        nombre_tag,
        usuarioId
      },
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error("❌ Error al crear tag:", error);
    res.status(500).json({ error: "Error al crear el tag" });
  }
};

// 🔹 Eliminar tag si pertenece al usuario
export const eliminarTag = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    // Buscar el tag
    const tag = await prisma.tags.findUnique({
      where: { id_Tag: parseInt(id) },
    });

    if (!tag) {
      return res.status(404).json({ error: "Tag no encontrado" });
    }

    if (tag.usuarioId !== usuarioId) {
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
