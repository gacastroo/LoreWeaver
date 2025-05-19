import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // === Crear usuario admin ===
  const hashedPassword = await bcrypt.hash('tichi6533', 10);
  const usuario = await prisma.usuario.upsert({
    where: { email: 'guillermoandca@gmail.com' },
    update: {},
    create: {
      email: 'guillermoandca@gmail.com',
      password: hashedPassword,
      nombre: 'Guillermo',
    },
  });

  // === Historias ===
  console.log("Insertando historia: Carrie");
  const carrie = await prisma.historia.create({ 
    data: { 
      titulo: 'Carrie',
      usuarioId: usuario.id_usuario 
    } 
  });
  const juegos = await prisma.historia.create({ data: { titulo: 'Los Juegos del Hambre', usuarioId: usuario.id_usuario } });
  const speak = await prisma.historia.create({ data: { titulo: 'Speak',  usuarioId: usuario.id_usuario } });

  // === Universos ===
  const uniCarrie = await prisma.universo.create({ data: { titulo_universo: 'Chamberlain High', historiaId: carrie.id } });
  const uni12 = await prisma.universo.create({ data: { titulo_universo: 'Distrito 12', historiaId: juegos.id } });
  const uniSpeak = await prisma.universo.create({ data: { titulo_universo: 'Merryweather High', historiaId: speak.id } });

  // === Capítulos ===
  const [cap1, cap2, cap3] = await Promise.all([
    prisma.capitulo.create({ data: { titulo_capitulo: 'Baile sangriento', historiaId: carrie.id, universoId: uniCarrie.id_Universo } }),
    prisma.capitulo.create({ data: { titulo_capitulo: 'La cosecha', historiaId: juegos.id, universoId: uni12.id_Universo } }),
    prisma.capitulo.create({ data: { titulo_capitulo: 'Primer día', historiaId: speak.id, universoId: uniSpeak.id_Universo } }),
  ]);

  // === Escenas ===
  await prisma.escena.createMany({
    data: [
      { titulo_escena: 'Carrie explota sus poderes', orden_escena: 1, historiaId: carrie.id, capituloId: cap1.id_Capitulo, universoId: uniCarrie.id_Universo },
      { titulo_escena: 'Katniss se ofrece como tributo', orden_escena: 1, historiaId: juegos.id, capituloId: cap2.id_Capitulo, universoId: uni12.id_Universo },
      { titulo_escena: 'Melinda llega a clase', orden_escena: 1, historiaId: speak.id, capituloId: cap3.id_Capitulo, universoId: uniSpeak.id_Universo },
    ]
  });

  // === Tags ===
  const [supernatural, marginada, rebeldia, liderazgo, trauma, resiliencia] = await Promise.all([
    prisma.tags.create({ data: { nombre_tag: 'Poderes sobrenaturales', historiaId: carrie.id } }),
    prisma.tags.create({ data: { nombre_tag: 'Marginación', historiaId: carrie.id } }),
    prisma.tags.create({ data: { nombre_tag: 'Rebeldía', historiaId: juegos.id } }),
    prisma.tags.create({ data: { nombre_tag: 'Liderazgo', historiaId: juegos.id } }),
    prisma.tags.create({ data: { nombre_tag: 'Trastornos mentales', historiaId: speak.id } }),
    prisma.tags.create({ data: { nombre_tag: 'Resiliencia', historiaId: speak.id } }),
  ]);

  // === Personajes ===
  const [carrieWhite, katniss, melinda] = await Promise.all([
    prisma.personaje.create({ data: { nombre_personaje: 'Carrie White', descripcion_personaje: 'Joven con poderes telequinéticos', historiaId: carrie.id } }),
    prisma.personaje.create({ data: { nombre_personaje: 'Katniss Everdeen', descripcion_personaje: 'Tributo del Distrito 12', historiaId: juegos.id } }),
    prisma.personaje.create({ data: { nombre_personaje: 'Melinda Sordino', descripcion_personaje: 'Chica retraída que deja de hablar', historiaId: speak.id } }),
  ]);

  // === Relaciones personaje-tag ===
  await prisma.personaje_Tag.createMany({
    data: [
      { personajeId: carrieWhite.id_Personaje, tagId: supernatural.id_Tag },
      { personajeId: carrieWhite.id_Personaje, tagId: marginada.id_Tag },
      { personajeId: katniss.id_Personaje, tagId: rebeldia.id_Tag },
      { personajeId: katniss.id_Personaje, tagId: liderazgo.id_Tag },
      { personajeId: melinda.id_Personaje, tagId: trauma.id_Tag },
      { personajeId: melinda.id_Personaje, tagId: resiliencia.id_Tag },
    ]
  });

  console.log("✅ Base de datos inicializada con historias y relaciones asociadas al usuario.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
