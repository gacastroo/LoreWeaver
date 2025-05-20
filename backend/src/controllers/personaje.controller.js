import prisma from "../lib/prisma.js";
import { getUserIdFromToken } from "../utils/auth.js";

// 🔹 Crear personaje (todo opcional menos nombre)
export const crearPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { nombre, descripcion, historiaId, tagId } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    let historia = null;

    if (historiaId) {
      historia = await prisma.historia.findFirst({
        where: { id: parseInt(historiaId), usuarioId: userId },
      });

      if (!historia) {
        return res
          .status(403)
          .json({ error: "No tienes permiso para asociar esta historia" });
      }
    }

    const personaje = await prisma.personaje.create({
      data: {
        nombre_personaje: nombre,
        descripcion_personaje: descripcion || "",
        historiaId: historia ? historia.id : null,
        usuarioId: userId, // ✅ Clave para que se cree en el usuario correcto
      },
    });

    if (tagId) {
      const tag = await prisma.tags.findUnique({
        where: { id_Tag: parseInt(tagId) },
      });

      if (tag) {
        await prisma.personaje_Tag.create({
          data: {
            personajeId: personaje.id_Personaje,
            tagId: tag.id_Tag,
          },
        });
      }
    }

    res.status(201).json(personaje);
  } catch (error) {
    console.error("❌ Error al crear personaje:", error);
    res.status(500).json({ error: "Error interno al crear personaje" });
  }
};

// 🔹 Obtener personajes del usuario
export const obtenerPersonajes = async (req, res) => {
  const userId = getUserIdFromToken(req);

  try {
    const personajes = await prisma.personaje.findMany({
      where: { usuarioId: userId },
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

// 🔹 Obtener personaje por ID
export const obtenerPersonajePorId = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: { id_Personaje: parseInt(id), usuarioId: userId },
      include: {
        historia: { select: { titulo: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!personaje) {
      return res.status(404).json({ error: "Personaje no encontrado o sin permiso" });
    }

    res.json(personaje);
  } catch (error) {
    console.error("❌ Error al obtener personaje:", error);
    res.status(500).json({ error: "Error al obtener personaje" });
  }
};

// 🔹 Actualizar personaje
export const actualizarPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { nombre_personaje, descripcion_personaje } = req.body;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: { id_Personaje: parseInt(id), usuarioId: userId },
    });

    if (!personaje) {
      return res.status(403).json({ error: "No tienes permiso para actualizar este personaje" });
    }

    const actualizado = await prisma.personaje.update({
      where: { id_Personaje: parseInt(id) },
      data: { nombre_personaje, descripcion_personaje },
    });

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar personaje:", error);
    res.status(500).json({ error: "Error al actualizar personaje" });
  }
};

// 🔹 Eliminar personaje
export const eliminarPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: { id_Personaje: parseInt(id), usuarioId: userId },
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

// 🔹 Asignar tag a personaje
export const asignarTagAPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { personajeId, tagId } = req.body;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: { id_Personaje: parseInt(personajeId), usuarioId: userId },
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

    const yaExiste = await prisma.personaje_Tag.findFirst({
      where: {
        personajeId: personaje.id_Personaje,
        tagId: tag.id_Tag,
      },
    });

    if (yaExiste) {
      return res.status(400).json({ error: "Este personaje ya tiene este tag asignado" });
    }

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

// 🔹 Quitar tag de personaje
export const quitarTagPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { tagId } = req.body;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: { id_Personaje: parseInt(id), usuarioId: userId },
    });

    if (!personaje) {
      return res.status(403).json({ error: "No puedes modificar este personaje" });
    }

    const rel = await prisma.personaje_Tag.findFirst({
      where: {
        personajeId: personaje.id_Personaje,
        tagId: parseInt(tagId),
      },
    });

    if (!rel) {
      return res.status(404).json({ error: "Tag no asignado al personaje" });
    }

    await prisma.personaje_Tag.delete({
      where: { id: rel.id },
    });

    res.json({ message: "Tag quitado correctamente" });
  } catch (error) {
    console.error("❌ Error al quitar tag:", error);
    res.status(500).json({ error: "Error interno al quitar tag" });
  }
};

// 🔹 Asociar personaje a una historia
export const asociarPersonajeAHistoria = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { historiaId } = req.body;

  try {
    const historia = await prisma.historia.findFirst({
      where: { id: parseInt(historiaId), usuarioId: userId },
    });

    if (!historia) {
      return res.status(403).json({ error: "No puedes asociar a esta historia." });
    }

    const personaje = await prisma.personaje.findFirst({
      where: { id_Personaje: parseInt(id), usuarioId: userId },
    });

    if (!personaje) {
      return res.status(404).json({ error: "Personaje no encontrado o sin permiso" });
    }

    const actualizado = await prisma.personaje.update({
      where: { id_Personaje: parseInt(id) },
      data: { historiaId: historia.id },
    });

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al asociar personaje:", error);
    res.status(500).json({ error: "Error interno al asociar personaje." });
  }
};

// 🔹 Desasociar historia del personaje
export const desasociarHistoriaPersonaje = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const personaje = await prisma.personaje.findFirst({
      where: { id_Personaje: parseInt(id), usuarioId: userId },
    });

    if (!personaje) {
      return res.status(403).json({ error: "No tienes permiso para modificar este personaje" });
    }

    const actualizado = await prisma.personaje.update({
      where: { id_Personaje: parseInt(id) },
      data: { historiaId: null },
    });

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al desasociar historia:", error);
    res.status(500).json({ error: "Error al desasociar la historia" });
  }
};
