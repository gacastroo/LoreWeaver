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

// 🔹 Crear escena usando solo capituloId (la historia se deduce)
export const crearEscena = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { titulo_escena, capituloId, orden_escena, universoId } = req.body;

  if (!titulo_escena || !capituloId) {
    return res.status(400).json({ error: "Título y capítulo son requeridos." });
  }

  try {
    // Buscar el capítulo y su historia para validar propiedad
    const capitulo = await prisma.capitulo.findFirst({
      where: {
        id_Capitulo: parseInt(capituloId),
        historia: {
          usuarioId: userId,
        },
      },
    });

    if (!capitulo) {
      return res.status(403).json({ error: "No tienes permiso sobre este capítulo." });
    }

    const escena = await prisma.escena.create({
      data: {
        titulo_escena,
        orden_escena: orden_escena ? parseInt(orden_escena) : 0,
        historiaId: capitulo.historiaId,
        capituloId: capitulo.id_Capitulo,
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
