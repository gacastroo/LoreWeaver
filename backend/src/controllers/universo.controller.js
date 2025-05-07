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

export const eliminarUniverso = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.universo.delete({
      where: { id_Universo: parseInt(id) }
    });

    res.json({ message: "Universo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar universo:", error);
    res.status(500).json({ error: "Error al eliminar universo" });
  }
};

// 🔹 Obtener universos por usuario (según sus historias)
export const obtenerUniversos = async (req, res) => {
  const userId = req.usuario?.id; 

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
}
export const obtenerUniversoPorId = async (req, res) => {
  const { id } = req.params;
  const usuarioId = getUserIdFromToken(req);

  try {
    const universo = await prisma.universo.findFirst({
      where: {
        id_Universo: parseInt(id),
        historia: { usuarioId },
      },
      include: {
        historia: true,
      },
    });

    if (!universo) {
      return res.status(404).json({ error: "Universo no encontrado" });
    }

    res.json(universo);
  } catch (error) {
    console.error("❌ Error al obtener universo:", error);
    res.status(500).json({ error: "Error al obtener universo" });
  }
}
export const actualizarUniverso = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);
  const { id } = req.params;
  const { titulo_universo, descripcion_universo } = req.body;

  try {
    const universo = await prisma.universo.findFirst({
      where: {
        id_Universo: parseInt(id),
        historia: { usuarioId },
      },
    });

    if (!universo) {
      return res.status(403).json({ error: "No tienes permiso para editar este universo" });
    }

    const actualizado = await prisma.universo.update({
      where: { id_Universo: parseInt(id) },
      data: {
        titulo_universo,
        descripcion_universo,
      },
    });

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar universo:", error);
    res.status(500).json({ error: "Error al actualizar universo" });
  }
};



