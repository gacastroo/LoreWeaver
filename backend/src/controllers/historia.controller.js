import prisma from '../lib/prisma.js'
import { getUserIdFromToken } from '../utils/auth.js'

// 🔹 Crear historia (solo para el usuario autenticado)
export const crearHistoria = async (req, res) => {
  const { titulo, contenido } = req.body;
  const usuarioId = req.usuario?.id;

  try {
    const historia = await prisma.historia.create({
      data: {
        titulo,
        contenido,
        usuarioId, // conexión directa
      },
    });
    res.status(201).json(historia);
  } catch (error) {
    console.error("❌ Error al crear historia:", error);
    res.status(500).json({ error: "Error al crear historia" });
  }
};

// 🔹 Obtener todas las historias del usuario
export const obtenerHistorias = async (req, res) => {
  const usuarioId = req.usuario?.id;

  try {
    const historias = await prisma.historia.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
      include: {
        personajes: true,
        universos: true,
        capitulos: true,
        escenas: true,
        tags: true
      },
    });
    res.json(historias);
  } catch (error) {
    console.error("❌ Error al obtener historias:", error);
    res.status(500).json({ error: "Error al obtener historias" });
  }
};

// 🔹 Obtener una historia concreta del usuario
export const obtenerHistoria = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario?.id;

  try {
    const historia = await prisma.historia.findFirst({
      where: {
        id: parseInt(id),
        usuarioId
      },
      include: {
        personajes: true,
        capitulos: true,
        escenas: true,
        universos: true,
        tags: true
      }
    });

    if (!historia) return res.status(404).json({ error: 'Historia no encontrada o no autorizada' });
    res.json(historia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historia' });
  }
};

// 🔹 Actualizar una historia del usuario
export const actualizarHistoria = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;
  const usuarioId = req.usuario?.id;

  try {
    const historia = await prisma.historia.findFirst({
      where: { id: parseInt(id), usuarioId }
    });

    if (!historia) return res.status(403).json({ error: "No autorizado" });

    const historiaActualizada = await prisma.historia.update({
      where: { id: historia.id },
      data: {
        ...(titulo && { titulo }),
        ...(contenido && { contenido }),
      },
    });

    res.json(historiaActualizada);
  } catch (error) {
    console.error("❌ Error al actualizar historia:", error);
    res.status(500).json({ error: "Error al actualizar historia" });
  }
};

// 🔹 Eliminar una historia del usuario
export const eliminarHistoria = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario?.id;

  try {
    const historia = await prisma.historia.findFirst({
      where: {
        id: parseInt(id),
        usuarioId
      },
    });

    if (!historia) return res.status(403).json({ error: "No autorizado para eliminar esta historia" });

    await prisma.historia.delete({
      where: { id: historia.id }
    });

    res.json({ message: 'Historia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar historia' });
  }
};
