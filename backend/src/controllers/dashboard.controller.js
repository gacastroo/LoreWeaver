import { prisma } from "../lib/prisma.js";

export const obtenerEstadisticas = async (req, res) => {
  const userId = req.user.id;

  try {
    const [totalHistorias, totalTags, totalCapitulos, totalEscenas] = await Promise.all([
      prisma.historia.count({ where: { usuarioId: userId } }),
      prisma.tags.count({ where: { historia: { usuarioId: userId } } }),
      prisma.capitulo.count({ where: { historia: { usuarioId: userId } } }),
      prisma.escena.count({ where: { historia: { usuarioId: userId } } }),
    ]);

    // Personajes
    const totalPersonajes = await prisma.personaje.count({ where: { usuarioId: userId } });
    const personajesConHistoria = await prisma.personaje.count({
      where: { usuarioId: userId, historiaId: { not: null } },
    });
    const personajesSinHistoria = totalPersonajes - personajesConHistoria;

    // Universos
    const totalUniversos = await prisma.universo.count({ where: { usuarioId: userId } });
    const universosConHistoria = await prisma.universo.count({
      where: { usuarioId: userId, historiaId: { not: null } },
    });
    const universosSinHistoria = totalUniversos - universosConHistoria;

    res.json({
      stories: totalHistorias,
      tags: totalTags,
      chapters: totalCapitulos,
      scenes: totalEscenas,
      characters: totalPersonajes,
      characters_withStories: personajesConHistoria,
      characters_withoutStories: personajesSinHistoria,
      universes: totalUniversos,
      universes_withStories: universosConHistoria,
      universes_withoutStories: universosSinHistoria,
    });
  } catch (error) {
    console.error("❌ Error obteniendo estadísticas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
