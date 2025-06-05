import { prisma } from "../lib/prisma.js";

export const obtenerEstadisticas = async (req, res) => {
  const userId = req.user.id;

  try {
    // 🔹 Obtener IDs de los personajes del usuario
    const personajesUsuario = await prisma.personaje.findMany({
      where: { usuarioId: userId },
      select: { id_Personaje: true },
    });
    const idsPersonajes = personajesUsuario.map(p => p.id_Personaje);

    // 🔹 Obtener IDs únicos de tags asociados a esos personajes
    const tagsAsociados = await prisma.personaje_Tag.findMany({
      where: { personajeId: { in: idsPersonajes } },
      select: { tagId: true },
      distinct: ['tagId'],
    });
    const tagIdsAsociados = tagsAsociados.map(t => t.tagId);

    // 🔹 Contar todos los tags del sistema que estén:
    //   - Asociados a personajes del usuario, o
    //   - Sueltos (sin personajes relacionados)
    const totalTags = await prisma.tags.count({
      where: {
        OR: [
          { id_Tag: { in: tagIdsAsociados } },
          {
            personajes: {
              none: {}, // Tags sin personajes asociados
            },
          },
        ],
      },
    });

    // 🔹 Contadores generales
    const [totalHistorias, totalCapitulos, totalEscenas] = await Promise.all([
      prisma.historia.count({ where: { usuarioId: userId } }),
      prisma.capitulo.count({ where: { historia: { usuarioId: userId } } }),
      prisma.escena.count({ where: { historia: { usuarioId: userId } } }),
    ]);

    // 🔹 Personajes
    const totalPersonajes = personajesUsuario.length;
    const personajesConHistoria = await prisma.personaje.count({
      where: { usuarioId: userId, historiaId: { not: null } },
    });
    const personajesSinHistoria = totalPersonajes - personajesConHistoria;

    // 🔹 Universos
    const totalUniversos = await prisma.universo.count({ where: { usuarioId: userId } });
    const universosConHistoria = await prisma.universo.count({
      where: { usuarioId: userId, historiaId: { not: null } },
    });
    const universosSinHistoria = totalUniversos - universosConHistoria;

    // 🔹 Respuesta final
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
