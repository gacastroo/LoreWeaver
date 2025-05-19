import prisma from "../lib/prisma.js";
import { getUserIdFromToken } from "../utils/auth.js";

// 🔹 Crear universo con historia opcional
export const crearUniverso = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { titulo_universo, descripcion_universo, historiaId } = req.body;

  if (!titulo_universo) {
    return res.status(400).json({ error: "El título del universo es obligatorio." });
  }

  try {
    let historia = null;

    if (historiaId) {
      historia = await prisma.historia.findFirst({
        where: {
          id: parseInt(historiaId),
          usuarioId: userId,
        },
      });

      if (!historia) {
        return res.status(403).json({ error: "No tienes permiso para usar esta historia." });
      }
    }

    const universo = await prisma.universo.create({
      data: {
        titulo_universo,
        descripcion_universo: descripcion_universo || "",
        historiaId: historia ? historia.id : null,
      },
    });

    res.status(201).json(universo);
  } catch (error) {
    console.error("❌ Error al crear universo:", error);
    res.status(500).json({ error: "Error al crear universo" });
  }
};

// 🔹 Eliminar universo
export const eliminarUniverso = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.universo.delete({
      where: { id_Universo: parseInt(id) },
    });

    res.json({ message: "Universo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar universo:", error);
    res.status(500).json({ error: "Error al eliminar universo" });
  }
};

// 🔹 Obtener todos los universos del usuario (según sus historias)
export const obtenerUniversos = async (req, res) => {
  const userId = req.usuario?.id;

  try {
    const universos = await prisma.universo.findMany({
      where: {
        OR: [
          { historia: { usuarioId: userId } },
          { historiaId: null },
        ],
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

// 🔹 Obtener un universo por ID
export const obtenerUniversoPorId = async (req, res) => {
  const { id } = req.params;
  const usuarioId = getUserIdFromToken(req);

  try {
    const universo = await prisma.universo.findFirst({
      where: {
        id_Universo: parseInt(id),
        OR: [
          { historia: { usuarioId } },
          { historiaId: null },
        ],
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
};

// 🔹 Actualizar universo
export const actualizarUniverso = async (req, res) => {
  const usuarioId = getUserIdFromToken(req);
  const { id } = req.params;
  const { titulo_universo, descripcion_universo } = req.body;

  try {
    const universo = await prisma.universo.findFirst({
      where: {
        id_Universo: parseInt(id),
        OR: [
          { historia: { usuarioId } },
          { historiaId: null },
        ],
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

export const asociarUniversoAHistoria = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { historiaId } = req.body;

  try {
    const historia = await prisma.historia.findFirst({
      where: {
        id: parseInt(historiaId),
        usuarioId: userId,
      },
    });

    if (!historia) {
      return res.status(403).json({ error: "No tienes permiso sobre esta historia." });
    }

    const universo = await prisma.universo.findUnique({
      where: { id_Universo: parseInt(id) },
    });

    if (!universo) {
      return res.status(404).json({ error: "Universo no encontrado." });
    }

    const actualizado = await prisma.universo.update({
      where: { id_Universo: parseInt(id) },
      data: { historiaId: historia.id },
    });

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al asociar universo:", error);
    res.status(500).json({ error: "Error al asociar universo" });
  }
};

