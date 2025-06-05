import prisma from '../lib/prisma.js';
import { getUserIdFromToken } from '../utils/auth.js';

// 🔹 Obtener todos los tags asociados a personajes del usuario
export const obtenerTags = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);

  try {
    // ✅ Obtenemos todos los tags cuyos personajes (si existen) sean del usuario
    const tags = await prisma.tags.findMany({
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

    // ✅ Filtramos los tags que:
    // - no tienen ningún personaje asociado
    // - o al menos un personaje asociado es del usuario
    const filtered = tags.filter(
      (tag) =>
        tag.personajes.length === 0 ||
        tag.personajes.some((pt) => pt.personaje?.usuarioId === usuarioId)
    );

    res.json(filtered);
  } catch (error) {
    console.error("❌ Error al obtener tags:", error);
    res.status(500).json({ error: "Error al obtener tags" });
  }
};


// 🔹 Crear un nuevo tag sin historiaId
export const crearTag = async (req, res) => {
  const { nombre_tag } = req.body;

  try {
    const tag = await prisma.tags.create({
      data: { nombre_tag },
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error("❌ Error al crear tag:", error);
    res.status(500).json({ error: "Error al crear el tag" });
  }
};

// 🔹 Eliminar tag si pertenece a un personaje del usuario
export const eliminarTag = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    // Buscar el tag con sus personajes
    const tag = await prisma.tags.findUnique({
      where: { id_Tag: parseInt(id) },
      include: {
        personajes: {
          include: {
            personaje: true,
          },
        },
      },
    });

    if (!tag) {
      return res.status(404).json({ error: "Tag no encontrado" });
    }

    // Validar si algún personaje asociado es del usuario
    const perteneceAlUsuario = tag.personajes.some(
      (pt) => pt.personaje?.usuarioId === usuarioId
    );

    // También permitir eliminar si el tag no tiene personajes asociados
    const sinPersonajes = tag.personajes.length === 0;

    if (!perteneceAlUsuario && !sinPersonajes) {
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

