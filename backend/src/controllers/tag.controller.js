import prisma from '../lib/prisma.js';

// Obtener todos los tags con personajes relacionados
export const obtenerTags = async (req, res) => {
  try {
    const tags = await prisma.tags.findMany({
      include: {
        personajes: {
          include: {
            personaje: {
              select: {
                nombre_personaje: true
              }
            }
          }
        }
      }
    });
    res.json(tags);
  } catch (error) {
    console.error("❌ Error al obtener tags:", error);
    res.status(500).json({ error: 'Error al obtener tags' });
  }
};

// Eliminar un tag
export const eliminarTag = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tags.delete({
      where: { id_Tag: parseInt(id) }
    });
    res.json({ message: 'Tag eliminado correctamente' });
  } catch (error) {
    console.error("❌ Error al eliminar tag:", error);
    res.status(500).json({ error: 'Error al eliminar tag' });
  }
};
