import prisma from "../lib/prisma.js";
import { getUserIdFromToken } from "../utils/auth.js";

// 🔹 Crear personaje (verifica que la historia sea del usuario)
export const crearPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { nombre_personaje, descripcion_personaje, historiaId } = req.body;

  try {
    const historia = await prisma.historia.findFirst({
      where: { id: parseInt(historiaId), usuarioId: userId },
    });

    if (!historia) {
      return res.status(403).json({ error: "No tienes permiso para modificar esta historia" });
    }

    const personaje = await prisma.personaje.create({
      data: {
        nombre_personaje,
        descripcion_personaje,
        historiaId: historia.id,
      },
    });

    res.status(201).json(personaje);
  } catch (error) {
    console.error("❌ Error al crear personaje:", error);
    res.status(500).json({ error: "Error al crear personaje" });
  }
};

// 🔹 Obtener personajes del usuario
export const obtenerPersonajes = async (req, res) => {
  const userId = getUserIdFromToken(req);
  try {
    const personajes = await prisma.personaje.findMany({
      where: {
        historia: {
          usuarioId: userId,
        },
      },
      include: {
        historia: { select: { titulo: true } },
        tags: { include: { tag: true } },
      },
    });

    res.json(personajes);
  } catch (error) {
    console.error("❌ Error al obtener personajes:", error);
    res.status(500).json({ error: "Error al obtener personajes" });
  }
};


// 🔹 Actualizar personaje si pertenece a historia del usuario
export const actualizarPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { nombre_personaje, descripcion_personaje } = req.body;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: {
        id_Personaje: parseInt(id),
        historia: { usuarioId: userId },
      },
    });

    if (!personaje) {
      return res.status(403).json({ error: "No tienes permiso para actualizar este personaje" });
    }

    const personajeActualizado = await prisma.personaje.update({
      where: { id_Personaje: parseInt(id) },
      data: { nombre_personaje, descripcion_personaje },
    });

    res.json(personajeActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar personaje:", error);
    res.status(500).json({ error: "Error al actualizar personaje" });
  }
};

// 🔹 Eliminar personaje si pertenece a historia del usuario
export const eliminarPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: {
        id_Personaje: parseInt(id),
        historia: { usuarioId: userId },
      },
    });

    if (!personaje) {
      return res.status(403).json({ error: "No tienes permiso para eliminar este personaje" });
    }

    await prisma.personaje.delete({
      where: { id_Personaje: parseInt(id) },
    });

    res.json({ message: "Personaje eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar personaje:", error);
    res.status(500).json({ error: "Error al eliminar personaje" });
  }
};

export const asignarTagAPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { personajeId, tagId } = req.body;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: {
        id_Personaje: parseInt(personajeId),
        historia: { usuarioId: userId },
      },
    });

    if (!personaje) {
      return res.status(403).json({ error: "No puedes modificar este personaje" });
    }

    const tag = await prisma.tags.findUnique({
      where: { id_Tag: parseInt(tagId) },
    });

    if (!tag) {
      return res.status(404).json({ error: "Tag no encontrado" });
    }

    // ✅ Validar si ya existe la relación
    const yaExiste = await prisma.personaje_Tag.findFirst({
      where: {
        personajeId: personaje.id_Personaje,
        tagId: tag.id_Tag,
      },
    });

    if (yaExiste) {
      return res.status(400).json({ error: "Este personaje ya tiene este tag asignado" });
    }

    // Crear relación personaje-tag
    await prisma.personaje_Tag.create({
      data: {
        personajeId: personaje.id_Personaje,
        tagId: tag.id_Tag,
      },
    });

    res.json({ message: "✅ Tag asignado correctamente" });
  } catch (error) {
    console.error("❌ Error al asignar tag:", error);
    res.status(500).json({ error: "Error al asignar tag al personaje" });
  }
};



