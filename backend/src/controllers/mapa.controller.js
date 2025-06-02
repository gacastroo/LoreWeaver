import prisma from '../lib/prisma.js';

export const obtenerDatosMapa = async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const historias = await prisma.historia.findMany({
      where: { usuarioId },
      include: {
        capitulos: { include: { escenas: true } },
        personajes: {
          include: {
            tags: { include: { tag: true } },
          },
        },
        tags: true,
        universos: true,
      },
    });

    const elements = [];

    for (const historia of historias) {
      const historiaId = `h-${historia.id}`;
      elements.push({ data: { id: historiaId, label: historia.titulo, tipo: "historia" } });

      for (const capitulo of historia.capitulos) {
        const capId = `c-${capitulo.id_Capitulo}`;
        elements.push({ data: { id: capId, label: capitulo.titulo_capitulo, tipo: "capitulo" } });
        elements.push({ data: { source: historiaId, target: capId } });

        for (const escena of capitulo.escenas) {
          const escId = `e-${escena.id_Escena}`;
          elements.push({ data: { id: escId, label: escena.titulo_escena, tipo: "escena" } });
          elements.push({ data: { source: capId, target: escId } });
        }
      }

      for (const personaje of historia.personajes) {
        const perId = `p-${personaje.id_Personaje}`;
        elements.push({ data: { id: perId, label: personaje.nombre_personaje, tipo: "personaje" } });
        elements.push({ data: { source: historiaId, target: perId } });

      for (const universo of historia.universos) {
        const uniId = `u-${universo.id_Universo}`;
        elements.push({ data: { id: uniId, label: universo.titulo_universo, tipo: "universo" } });
        elements.push({ data: { source: historiaId, target: uniId } });
      }


        for (const pt of personaje.tags) {
          if (pt.tag) {
            const tagId = `t-${pt.tag.id_Tag}`;
            if (!elements.find(e => e.data.id === tagId)) {
              elements.push({ data: { id: tagId, label: `#${pt.tag.nombre_tag}`, tipo: "tag" } });
            }
            elements.push({ data: { source: perId, target: tagId } });
          }
        }
      }

      for (const tag of historia.tags) {
        const tagId = `t-${tag.id_Tag}`;
        if (!elements.find(e => e.data.id === tagId)) {
          elements.push({ data: { id: tagId, label: `#${tag.nombre_tag}`, tipo: "tag" } });
        }
        elements.push({ data: { source: historiaId, target: tagId } });
      }
    }

    res.json(elements);
  } catch (error) {
    console.error("❌ Error al generar datos del mapa:", error);
    res.status(500).json({ error: "Error al generar el mapa" });
  }

  
};
