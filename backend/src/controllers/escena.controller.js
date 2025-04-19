import prisma from "../lib/prisma.js";
import { getUserIdFromToken } from "../utils/auth.js";

// 🔹 Obtener escenas del usuario
export const obtenerEscenas = async (req, res) => {
  const userId = getUserIdFromToken(req);

  try {
    const escenas = await prisma.escena.findMany({
      where: {
        historia: { usuarioId: userId },
      },
      include: {
        historia: { select: { titulo: true } },
        universo: { select: { titulo_universo: true } },
        capitulo: {
          select: {
            titulo_capitulo: true,
            historia: { select: { titulo: true } },
          },
        },
      },
    });

    res.json(escenas);
  } catch (error) {
    console.error("❌ Error al obtener escenas:", error);
    res.status(500).json({ error: "Error al obtener escenas" });
  }
};

// 🔹 Crear escena validando relaciones
export const crearEscena = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { titulo_escena, orden_escena, historiaId, capituloId, universoId } = req.body;

  try {
    const historia = await prisma.historia.findFirst({
      where: { id: parseInt(historiaId), usuarioId: userId },
    });

    if (!historia) {
      return res.status(403).json({ error: "No tienes permiso sobre esta historia." });
    }

    const escena = await prisma.escena.create({
      data: {
        titulo_escena,
        orden_escena: parseInt(orden_escena),
        historiaId: historia.id,
        capituloId: parseInt(capituloId),
        universoId: universoId ? parseInt(universoId) : null,
      },
    });

    res.status(201).json(escena);
  } catch (error) {
    console.error("❌ Error al crear escena:", error);
    res.status(500).json({ error: "Error al crear escena" });
  }
};

// 🔹 Actualizar escena
export const actualizarEscena = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { titulo_escena, orden_escena } = req.body;

  try {
    const escena = await prisma.escena.findUnique({
      where: { id_Escena: parseInt(id) },
      include: { historia: true },
    });

    if (!escena || escena.historia.usuarioId !== userId) {
      return res.status(403).json({ error: "No tienes permiso para editar esta escena." });
    }

    const actualizada = await prisma.escena.update({
      where: { id_Escena: parseInt(id) },
      data: {
        titulo_escena,
        orden_escena: parseInt(orden_escena),
      },
    });

    res.json(actualizada);
  } catch (error) {
    console.error("❌ Error al actualizar escena:", error);
    res.status(500).json({ error: "Error al actualizar escena" });
  }
};

// 🔹 Eliminar escena
export const eliminarEscena = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const escena = await prisma.escena.findUnique({
      where: { id_Escena: parseInt(id) },
      include: { historia: true },
    });

    if (!escena || escena.historia.usuarioId !== userId) {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta escena." });
    }

    await prisma.escena.delete({ where: { id_Escena: parseInt(id) } });

    res.json({ message: "Escena eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar escena:", error);
    res.status(500).json({ error: "Error al eliminar escena" });
  }
};
