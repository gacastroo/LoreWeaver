import { prisma } from '../lib/prisma.js';

export const obtenerEstadisticas = async (req, res) => {
  const userId = req.user.id;

  try {
    const historias = await prisma.historia.findMany({
      where: { usuarioId: userId },
      select: { contenido: true },
    });

    const totalPalabras = historias.reduce((total, historia) => {
      const texto = historia.contenido || '';
      const palabras = texto.trim().split(/\s+/).filter(Boolean).length;
      return total + palabras;
    }, 0);

    const totalTags = await prisma.tags.count({
      where: { historia: { usuarioId: userId } },
    });

    res.json({
      palabras: totalPalabras,
      tags: totalTags,
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
