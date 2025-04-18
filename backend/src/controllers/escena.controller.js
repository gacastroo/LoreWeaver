import prisma from '../lib/prisma.js';

export const obtenerEscenas = async (req, res) => {
    try {
      const escenas = await prisma.escena.findMany({
        include: {
          historia: { select: { titulo: true } },
          universo: { select: { titulo_universo: true } },
          capitulo: {
            select: {
              titulo_capitulo: true,
              historia: { select: { titulo: true } }, // adicional
            },
          },
        },
      });
      res.json(escenas);
    } catch (error) {
      console.error("❌ Error al obtener escenas:", error);
      res.status(500).json({ error: 'Error al obtener escenas' });
    }
  };
  

export const crearEscena = async (req, res) => {
  const { titulo_escena, orden_escena, historiaId, universoId } = req.body;
  try {
    const escena = await prisma.escena.create({
      data: {
        titulo_escena,
        orden_escena,
        historiaId: parseInt(historiaId),
        universoId: parseInt(universoId)
      }
    });
    res.status(201).json(escena);
  } catch (error) {
    console.error("❌ Error al crear escena:", error);
    res.status(500).json({ error: 'Error al crear escena' });
  }
};

export const obtenerEscena = async (req, res) => {
  const { id } = req.params;
  try {
    const escena = await prisma.escena.findUnique({
      where: { id_Escena: parseInt(id) }
    });
    res.json(escena);
  } catch (error) {
    console.error("❌ Error al obtener escena:", error);
    res.status(500).json({ error: 'Error al obtener escena' });
  }
};

export const actualizarEscena = async (req, res) => {
  const { id } = req.params;
  const { titulo_escena, orden_escena } = req.body;
  try {
    const escena = await prisma.escena.update({
      where: { id_Escena: parseInt(id) },
      data: { titulo_escena, orden_escena }
    });
    res.json(escena);
  } catch (error) {
    console.error("❌ Error al actualizar escena:", error);
    res.status(500).json({ error: 'Error al actualizar escena' });
  }
};

export const eliminarEscena = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.escena.delete({
      where: { id_Escena: parseInt(id) }
    });
    res.json({ message: 'Escena eliminado' });
  } catch (error) {
    console.error("❌ Error al eliminar escena:", error);
    res.status(500).json({ error: 'Error al eliminar escena' });
  }
};
