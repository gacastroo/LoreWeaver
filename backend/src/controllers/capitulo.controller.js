import prisma from '../lib/prisma.js';

export const obtenerCapitulos = async (req, res) => {
  try {
    const capitulos = await prisma.capitulo.findMany({
      include: {
        historia: { select: { titulo: true } },
        universo: { select: { titulo_universo: true } }
      }
    });
    res.json(capitulos);
  } catch (error) {
    console.error("❌ Error al obtener capítulos:", error);
    res.status(500).json({ error: 'Error al obtener capítulos' });
  }
};

export const crearCapitulo = async (req, res) => {
  try {
    const { titulo_capitulo, historiaId } = req.body;
    const capitulo = await prisma.capitulo.create({
      data: { titulo_capitulo, historiaId: parseInt(historiaId) }
    });
    res.status(201).json(capitulo);
  } catch (error) {
    console.error("❌ Error al crear capítulo:", error);
    res.status(500).json({ error: "Error al crear capítulo" });
  }
};
export const obtenerCapitulo = async (req, res) => {
  const { id } = req.params;
  try {
    const capitulo = await prisma.capitulo.findUnique({
      where: { id_Capitulo: parseInt(id) }
    });
    res.json(capitulo);
  } catch (error) {
    console.error("❌ Error al obtener capítulo:", error);
    res.status(500).json({ error: 'Error al obtener capítulo' });
  }
};

export const actualizarCapitulo = async (req, res) => {
  const { id } = req.params;
  const { titulo_capitulo, orden_capitulo } = req.body;
  try {
    const capitulo = await prisma.capitulo.update({
      where: { id_Capitulo: parseInt(id) },
      data: { titulo_capitulo, orden_capitulo }
    });
    res.json(capitulo);
  } catch (error) {
    console.error("❌ Error al actualizar capítulo:", error);
    res.status(500).json({ error: 'Error al actualizar capítulo' });
  }
};

export const eliminarCapitulo = async (req, res) => {
  const { id } = req.params;
  try {
    // Primero elimina las escenas asociadas
    await prisma.escena.deleteMany({
      where: {
        capituloId: parseInt(id),
      },
    });

    // Luego elimina el capítulo
    await prisma.capitulo.delete({
      where: { id_Capitulo: parseInt(id) },
    });

    res.json({ message: 'Capítulo y escenas asociadas eliminados' });
  } catch (error) {
    console.error("❌ Error al eliminar capítulo:", error);
    res.status(500).json({ error: 'Error al eliminar capítulo' });
  }
};

