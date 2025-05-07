import prisma from "../lib/prisma.js";
import { getUserIdFromToken } from "../utils/auth.js";

// 🔹 Crear capítulo
export const crearCapitulo = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { titulo_capitulo, historiaId, universoId } = req.body;

  if (!titulo_capitulo || !historiaId) {
    return res.status(400).json({ error: "El título y la historia son obligatorios." });
  }

  try {
    const historia = await prisma.historia.findFirst({
      where: {
        id: parseInt(historiaId),
        usuarioId: userId,
      },
    });

    if (!historia) {
      return res.status(403).json({ error: "No tienes permiso para agregar capítulos a esta historia." });
    }

    const capitulo = await prisma.capitulo.create({
      data: {
        titulo_capitulo,
        historiaId: historia.id,
        universoId: universoId ? parseInt(universoId) : null,
      },
    });

    res.status(201).json(capitulo);
  } catch (error) {
    console.error("❌ Error al crear capítulo:", error);
    res.status(500).json({ error: "Error al crear capítulo" });
  }
};

// 🔹 Obtener capítulos
export const obtenerCapitulos = async (req, res) => {
  const userId = getUserIdFromToken(req);

  try {
    const capitulos = await prisma.capitulo.findMany({
      where: {
        historia: {
          usuarioId: userId,
        },
      },
      include: {
        historia: { select: { titulo: true } },
        universo: { select: { titulo_universo: true } },
      },
    });

    res.json(capitulos);
  } catch (error) {
    console.error("❌ Error al obtener capítulos:", error);
    res.status(500).json({ error: "Error al obtener capítulos" });
  }
};

// 🔹 Actualizar capítulo
export const actualizarCapitulo = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { titulo_capitulo } = req.body;

  try {
    const capitulo = await prisma.capitulo.findFirst({
      where: {
        id_Capitulo: parseInt(id),
        historia: { usuarioId: userId },
      },
    });

    if (!capitulo) {
      return res.status(403).json({ error: "No puedes modificar este capítulo" });
    }

    const actualizado = await prisma.capitulo.update({
      where: { id_Capitulo: parseInt(id) },
      data: { titulo_capitulo },
    });

    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar capítulo:", error);
    res.status(500).json({ error: "Error al actualizar capítulo" });
  }
};

// 🔹 Eliminar capítulo
export const eliminarCapitulo = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const capitulo = await prisma.capitulo.findFirst({
      where: {
        id_Capitulo: parseInt(id),
        historia: { usuarioId: userId },
      },
    });

    if (!capitulo) {
      return res.status(403).json({ error: "No puedes eliminar este capítulo" });
    }

    await prisma.capitulo.delete({
      where: { id_Capitulo: parseInt(id) },
    });

    res.json({ message: "Capítulo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar capítulo:", error);
    res.status(500).json({ error: "Error al eliminar capítulo" });
  }
};
