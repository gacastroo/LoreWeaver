import prisma from '../lib/prisma.js'

// 🔹 Crear historia (vacía, solo con título)
export const crearHistoria = async (req, res) => {
  const { titulo } = req.body;
  const usuarioId = req.usuario?.id;

  console.log("📥 POST /historias →", { titulo, usuarioId });

  if (!titulo?.trim()) {
    return res.status(400).json({ error: "El título es obligatorio." });
  }

  try {
    const historia = await prisma.historia.create({
      data: {
        titulo,
        usuarioId
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
      }
    });

    if (!historia) return res.status(404).json({ error: 'Historia no encontrada o no autorizada' });
    res.json(historia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historia' });
  }
};

// 🔹 Actualizar solo el título de la historia
export const actualizarHistoria = async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const usuarioId = req.usuario?.id;

  if (!titulo?.trim()) {
    return res.status(400).json({ error: "El título no puede estar vacío." });
  }

  try {
    const historia = await prisma.historia.findFirst({
      where: { id: parseInt(id), usuarioId }
    });

    if (!historia) return res.status(403).json({ error: "No autorizado" });

    const historiaActualizada = await prisma.historia.update({
      where: { id: historia.id },
      data: { titulo }
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

export const obtenerRelacionesHistoria = async (req, res) => {
  const { id } = req.params;
  const userId = req.usuario?.id;

  try {
    const historia = await prisma.historia.findFirst({
      where: {
        id: Number(id),
        usuarioId: userId,
      },
      include: {
        personajes: {
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
        universos: true,
        capitulos: true,
        escenas: {
          include: {
            universo: true,
            capitulo: true,
          },
        },
      },
    });

    if (!historia) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }

    // Obtener tags únicos desde los personajes
    const tagsUnicos = Array.from(
      new Set(
        historia.personajes.flatMap((p) =>
          p.tags.map((t) => t.tag.nombre_tag)
        )
      )
    );

    res.json({
      historia: {
        id: historia.id,
        titulo: historia.titulo,
      },
      personajes: historia.personajes,
      universos: historia.universos,
      capitulos: historia.capitulos,
      escenas: historia.escenas,
      tags: tagsUnicos,
    });
  } catch (error) {
    console.error("❌ Error al obtener relaciones de historia:", error);
    res.status(500).json({ error: "Error al obtener relaciones de historia" });
  }
};
