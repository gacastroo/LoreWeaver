import prisma from '../lib/prisma.js';

export const obtenerDatosMapa = async (req, res) => {
  try {
    const historias = await prisma.historia.findMany({
      include: {
        capitulos: {
          include: {
            escenas: true,
          },
        },
        personajes: {
          include: {
            tags: {
              include: { tag: true },
            },
          },
        },
        tags: true,
      },
    });

    const elements = [];

    for (const historia of historias) {
      const historiaId = `h-${historia.id}`;
      elements.push({
        data: {
          id: historiaId,
          label: historia.titulo,
          tipo: "historia",
        },
      });

      for (const capitulo of historia.capitulos) {
        const capituloId = `c-${capitulo.id_Capitulo}`;
        elements.push({
          data: {
            id: capituloId,
            label: capitulo.titulo_capitulo,
            tipo: "capitulo",
          },
        });
        elements.push({ data: { source: historiaId, target: capituloId } });

        for (const escena of capitulo.escenas) {
          const escenaId = `e-${escena.id_Escena}`;
          elements.push({
            data: {
              id: escenaId,
              label: escena.titulo_escena,
              tipo: "escena",
            },
          });
          elements.push({ data: { source: capituloId, target: escenaId } });
        }
      }

      for (const personaje of historia.personajes) {
        const personajeId = `p-${personaje.id_Personaje}`;
        elements.push({
          data: {
            id: personajeId,
            label: personaje.nombre_personaje,
            tipo: "personaje",
          },
        });
        elements.push({ data: { source: historiaId, target: personajeId } });

        for (const pt of personaje.tags) {
          if (pt.tag) {
            const tagId = `t-${pt.tag.id_Tag}`;
            if (!elements.some((e) => e.data.id === tagId)) {
              elements.push({
                data: {
                  id: tagId,
                  label: `#${pt.tag.nombre_tag}`,
                  tipo: "tag",
                },
              });
            }
            elements.push({ data: { source: personajeId, target: tagId } });
          }
        }
      }

      for (const tag of historia.tags) {
        const tagId = `t-${tag.id_Tag}`;
        if (!elements.some((e) => e.data.id === tagId)) {
          elements.push({
            data: {
              id: tagId,
              label: `#${tag.nombre_tag}`,
              tipo: "tag",
            },
          });
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
