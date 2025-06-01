import prisma from "../src/lib/prisma.js";


const debugUserContent = async () => {
  const userId = 1; // 👈 Reemplaza con el ID del usuario que estás usando para probar

  try {
    console.log("📦 Personajes del usuario:");
    const personajes = await prisma.personaje.findMany({
      where: { usuarioId: userId },
      select: {
        id_Personaje: true,
        nombre_personaje: true,
        historiaId: true,
      },
    });
    personajes.forEach(p =>
      console.log(`🧍 Personaje ID: ${p.id_Personaje}, Nombre: ${p.nombre_personaje}, HistoriaId: ${p.historiaId}`)
    );

    console.log("\n🌌 Universos del usuario:");
    const universos = await prisma.universo.findMany({
      where: { usuarioId: userId },
      select: {
        id_Universo: true,
        titulo_universo: true,
        historiaId: true,
      },
    });
    universos.forEach(u =>
      console.log(`🌍 Universo ID: ${u.id_Universo}, Título: ${u.titulo_universo}, HistoriaId: ${u.historiaId}`)
    );

    console.log("\n✅ Depuración completada.");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error al obtener datos:", err);
    process.exit(1);
  }
};

debugUserContent();
