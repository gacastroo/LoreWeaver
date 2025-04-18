import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Crear historias
  const historia1 = await prisma.historia.create({
    data: { titulo: 'El Imperio Sombrío' }
  });

  const historia2 = await prisma.historia.create({
    data: { titulo: 'Crónicas de Estrellas' }
  });

  // 2. Crear universos
  const universo1 = await prisma.universo.create({
    data: {
      titulo_universo: 'Mundo Infernal',
      descripcion_universo: 'Un mundo donde reinan las sombras',
      historiaId: historia1.id,
    },
  });

  const universo2 = await prisma.universo.create({
    data: {
      titulo_universo: 'Galaxia Argón',
      descripcion_universo: 'Un universo futurista lleno de estrellas en guerra',
      historiaId: historia2.id,
    },
  });

  // 3. Crear capítulos
  const capitulo1 = await prisma.capitulo.create({
    data: {
      titulo_capitulo: 'La Caída del Sol',
      orden_capitulo: '1',
      historiaId: historia1.id,
      universoId: universo1.id_Universo,
    },
  });

  const capitulo2 = await prisma.capitulo.create({
    data: {
      titulo_capitulo: 'Sueños de Fuego',
      orden_capitulo: '1',
      historiaId: historia2.id,
      universoId: universo2.id_Universo,
    },
  });

  // 4. Crear escenas
  await prisma.escena.createMany({
    data: [
      {
        contenido: 'El rey cae ante la oscuridad.',
        historiaId: historia1.id,
        capituloId: capitulo1.id_Capitulo,
      },
      {
        contenido: 'La princesa escapa al bosque maldito.',
        historiaId: historia1.id,
        capituloId: capitulo1.id_Capitulo,
      },
      {
        contenido: 'Explosiones en el núcleo galáctico.',
        historiaId: historia2.id,
        capituloId: capitulo2.id_Capitulo,
      },
    ],
  });

  // 5. Crear tags
  const tag1 = await prisma.tags.create({
    data: {
      nombre_tag: 'Realeza',
      historiaId: historia1.id,
    },
  });

  const tag2 = await prisma.tags.create({
    data: {
      nombre_tag: 'Tecnología',
      historiaId: historia2.id,
    },
  });

  // 6. Crear personajes
  const personaje1 = await prisma.personaje.create({
    data: {
      nombre_personaje: 'Aria Moonshade',
      descripcion_personaje: 'Una princesa con un oscuro legado.',
      historiaId: historia1.id,
    },
  });

  const personaje2 = await prisma.personaje.create({
    data: {
      nombre_personaje: 'Darius Stormborn',
      descripcion_personaje: 'Guerrero forjado en el exilio.',
      historiaId: historia1.id,
    },
  });

  const personaje3 = await prisma.personaje.create({
    data: {
      nombre_personaje: 'Zeron Kaal',
      descripcion_personaje: 'Capitán de la nave fantasma del sistema Z-12.',
      historiaId: historia2.id,
    },
  });

  // 7. Asociar personajes a tags
  await prisma.personaje_Tag.createMany({
    data: [
      {
        personajeId: personaje1.id_Personaje,
        tagId: tag1.id_Tag,
      },
      {
        personajeId: personaje2.id_Personaje,
        tagId: tag1.id_Tag,
      },
      {
        personajeId: personaje3.id_Personaje,
        tagId: tag2.id_Tag,
      },
    ],
  });

  // 8. Crear usuario
  const hashedPassword = await bcrypt.hash('tichi6533', 10);

  await prisma.usuario.create({
    data: {
      email: 'guillermoandca@gmail.com',
      password: hashedPassword,
      nombre: 'Guillermo',
    },
  });

  console.log('✅ Base de datos poblada con datos de prueba.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
