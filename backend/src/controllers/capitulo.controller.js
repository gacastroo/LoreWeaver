import prisma from "../lib/prisma.js";
import { getUserIdFromToken } from "../utils/auth.js";

// 🔹 Crear capítulo
export const crearCapitulo = async (req, res) => {
  const { titulo_capitulo, contenido, historiaId } = req.body;

  try {
    const capitulo = await prisma.capitulo.create({
      data: {
        titulo_capitulo,
        contenido,
        historia: { connect: { id: parseInt(historiaId) } }
      }
    });

    res.status(201).json(capitulo);
  } catch (error) {
    console.error("❌ Error al crear capítulo:", error);
    res.status(500).json({ error: "Error al crear capítulo" });
  }
};

// 🔹 Obtener todos los capítulos del usuario
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

// 🔹 Actualizar capítulo (título y contenido)
export const actualizarCapitulo = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;
  const { titulo_capitulo, contenido } = req.body;

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
      data: {
        titulo_capitulo,
        contenido,
      },
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

// 🔹 Obtener un solo capítulo por ID
export const obtenerCapitulo = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { id } = req.params;

  try {
    const capitulo = await prisma.capitulo.findFirst({
      where: {
        id_Capitulo: parseInt(id),
        historia: { usuarioId: userId },
      },
      include: {
        historia: { select: { titulo: true } },
        universo: { select: { titulo_universo: true } },
      },
    });

    if (!capitulo) {
      return res.status(404).json({ error: "Capítulo no encontrado" });
    }

    res.json(capitulo);
  } catch (error) {
    console.error("❌ Error al obtener capítulo:", error);
    res.status(500).json({ error: "Error al obtener capítulo" });
  }
};

// 🔹 Obtener todos los capítulos de una historia (con contenido)
export const obtenerCapitulosPorHistoria = async (req, res) => {
  const userId = getUserIdFromToken(req);
  const { historiaId } = req.params;

  try {
    const historia = await prisma.historia.findFirst({
      where: {
        id: parseInt(historiaId),
        usuarioId: userId,
      },
    });

    if (!historia) {
      return res.status(403).json({ error: "No tienes acceso a esta historia" });
    }

    const capitulos = await prisma.capitulo.findMany({
      where: { historiaId: historia.id },
      select: {
        id_Capitulo: true,
        titulo_capitulo: true,
        contenido: true,
      },
    });

    res.json(capitulos);
  } catch (error) {
    console.error("❌ Error al obtener capítulos por historia:", error);
    res.status(500).json({ error: "Error al obtener capítulos por historia" });
  }
};
