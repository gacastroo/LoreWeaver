// backend/routes/storyTemplates.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { verifyToken } = require("../middleware/auth");

const prisma = new PrismaClient();

// ── Definición de plantillas ──────────────────────────────────────────────────
const TEMPLATES = {
  "heros-journey": {
    id: "heros-journey",
    name: "El Viaje del Héroe",
    author: "Joseph Campbell",
    description:
      "La estructura mítica presente en casi toda narrativa universal: un héroe que abandona su mundo ordinario, supera pruebas y regresa transformado.",
    icon: "⚔️",
    acts: 3,
    chapters: [
      { title: "El Mundo Ordinario", description: "El héroe en su vida cotidiana antes de la aventura.", act: 1, order: 1 },
      { title: "La Llamada a la Aventura", description: "Se presenta el problema o desafío que sacará al héroe de su zona de confort.", act: 1, order: 2 },
      { title: "El Rechazo de la Llamada", description: "El héroe duda o rechaza inicialmente el camino.", act: 1, order: 3 },
      { title: "El Encuentro con el Mentor", description: "Aparece una figura guía que da consejo, objetos o entrenamiento.", act: 1, order: 4 },
      { title: "Cruzando el Umbral", description: "El héroe acepta la aventura y abandona su mundo conocido.", act: 1, order: 5 },
      { title: "Pruebas, Aliados y Enemigos", description: "El héroe enfrenta obstáculos, conoce aliados y descubre a sus oponentes.", act: 2, order: 6 },
      { title: "La Caverna más Profunda", description: "El héroe se acerca al peligro central de la historia.", act: 2, order: 7 },
      { title: "La Prueba Suprema", description: "La crisis más dura. El héroe parece derrotado. Muerte simbólica.", act: 2, order: 8 },
      { title: "La Recompensa", description: "El héroe sobrevive y obtiene lo que buscaba: conocimiento, objeto o poder.", act: 2, order: 9 },
      { title: "El Camino de Regreso", description: "El héroe decide volver a su mundo ordinario con lo ganado.", act: 3, order: 10 },
      { title: "La Resurrección", description: "Última prueba donde el héroe debe aplicar todo lo aprendido.", act: 3, order: 11 },
      { title: "El Regreso con el Elixir", description: "El héroe vuelve transformado y comparte su aprendizaje.", act: 3, order: 12 },
    ],
  },

  "three-act": {
    id: "three-act",
    name: "Estructura de 3 Actos",
    author: "Aristóteles / Syd Field",
    description:
      "El esquema narrativo más usado en cine y literatura: planteamiento, confrontación y resolución con puntos de giro bien definidos.",
    icon: "🎭",
    acts: 3,
    chapters: [
      { title: "Presentación del mundo y personajes", description: "Establece el tono, el mundo y los personajes principales.", act: 1, order: 1 },
      { title: "Detonante (Inciting Incident)", description: "El evento que rompe el equilibrio inicial y pone la historia en marcha.", act: 1, order: 2 },
      { title: "Primer Punto de Giro", description: "Decisión o evento que empuja al protagonista al acto 2.", act: 1, order: 3 },
      { title: "Escalada de conflicto", description: "Los problemas se acumulan. El protagonista intenta resolver la situación.", act: 2, order: 4 },
      { title: "Punto Medio (Midpoint)", description: "Un cambio de perspectiva que reorienta la historia hacia adelante.", act: 2, order: 5 },
      { title: "Crisis (All is Lost)", description: "El momento más oscuro. Todo parece perdido para el protagonista.", act: 2, order: 6 },
      { title: "Segundo Punto de Giro", description: "Un descubrimiento o decisión que abre el camino hacia la resolución.", act: 2, order: 7 },
      { title: "Clímax", description: "El enfrentamiento final y la resolución del conflicto principal.", act: 3, order: 8 },
      { title: "Desenlace", description: "Las consecuencias del clímax y el nuevo estado del mundo.", act: 3, order: 9 },
    ],
  },

  "save-the-cat": {
    id: "save-the-cat",
    name: "Save the Cat",
    author: "Blake Snyder",
    description:
      "El beat sheet de Blake Snyder, una de las estructuras más usadas en Hollywood. 15 beats precisos que garantizan una historia satisfactoria.",
    icon: "🐱",
    acts: 3,
    chapters: [
      { title: "Imagen de Apertura", description: "Una imagen visual que establece el tono y el estado inicial del mundo.", act: 1, order: 1 },
      { title: "Planteamiento del Tema", description: "Alguien (no el protagonista) enuncia el tema de la historia.", act: 1, order: 2 },
      { title: "Preparación (Setup)", description: "Conocemos al protagonista, su mundo y su defecto.", act: 1, order: 3 },
      { title: "Catalizador", description: "El evento que lo cambia todo. La vida del protagonista no será igual.", act: 1, order: 4 },
      { title: "Debate", description: "El protagonista duda. ¿Acepto este cambio o me resisto?", act: 1, order: 5 },
      { title: "Ruptura hacia el Acto 2", description: "El protagonista decide actuar. Entra en un mundo nuevo.", act: 1, order: 6 },
      { title: "Historia B y Diversión y Juegos", description: "La promesa del trailer: lo que hace la película divertida o emocionante.", act: 2, order: 7 },
      { title: "Punto Medio", description: "Falsa victoria o falsa derrota. El juego sube de nivel.", act: 2, order: 8 },
      { title: "Los Malos se Acercan", description: "Las fuerzas del antagonista se organizan y atacan.", act: 2, order: 9 },
      { title: "Todo está Perdido", description: "El peor momento. El mundo del protagonista se derrumba.", act: 2, order: 10 },
      { title: "Noche Oscura del Alma", description: "El protagonista toca fondo. Reflexión antes del tercer acto.", act: 2, order: 11 },
      { title: "Ruptura hacia el Acto 3", description: "Una revelación o decisión que cambia todo. El tema se entiende.", act: 2, order: 12 },
      { title: "Final", description: "El protagonista aplica lo aprendido y enfrenta al antagonista.", act: 3, order: 13 },
      { title: "Imagen Final", description: "El mundo transformado. Espejo de la imagen de apertura.", act: 3, order: 14 },
    ],
  },

  "freytag": {
    id: "freytag",
    name: "Pirámide de Freytag",
    author: "Gustav Freytag",
    description:
      "La estructura clásica de la tragedia griega y los dramas de Shakespeare. Cinco etapas que construyen hacia el clímax y caen hacia el desenlace.",
    icon: "📐",
    acts: 5,
    chapters: [
      { title: "Exposición", description: "Presentación del mundo, personajes y situación inicial.", act: 1, order: 1 },
      { title: "Acción Ascendente", description: "Serie de eventos que aumentan la tensión y el conflicto.", act: 2, order: 2 },
      { title: "Clímax", description: "El punto de mayor tensión y el giro decisivo de la historia.", act: 3, order: 3 },
      { title: "Acción Descendente", description: "Consecuencias del clímax. La tensión comienza a resolverse.", act: 4, order: 4 },
      { title: "Desenlace (Catarsis)", description: "Resolución final. El conflicto se cierra y el mundo se estabiliza.", act: 5, order: 5 },
    ],
  },

  "in-medias-res": {
    id: "in-medias-res",
    name: "In Medias Res",
    author: "Horace / Narrativa clásica",
    description:
      "Empezar la historia en medio de la acción, luego revelar el contexto. Genera enganche inmediato y trabaja con flashbacks estratégicos.",
    icon: "⚡",
    acts: 3,
    chapters: [
      { title: "Apertura en el momento de máxima tensión", description: "La historia empieza en un momento de crisis o acción. El lector no sabe por qué.", act: 1, order: 1 },
      { title: "Retroceso: origen del conflicto", description: "Primer flashback o retroceso que explica cómo se llegó aquí.", act: 1, order: 2 },
      { title: "Retroceso: presentación de personajes", description: "Contexto adicional sobre los protagonistas y sus motivaciones.", act: 2, order: 3 },
      { title: "Presente: escalada", description: "La línea temporal principal avanza. Las piezas encajan.", act: 2, order: 4 },
      { title: "Retroceso: la verdad oculta", description: "El flashback más revelador. El lector entiende lo que no sabía.", act: 2, order: 5 },
      { title: "Presente: convergencia y resolución", description: "El pasado y el presente se unen. El clímax y desenlace.", act: 3, order: 6 },
    ],
  },
};

// ── GET /api/story-templates
// Lista todas las plantillas disponibles (solo metadata, sin capítulos)
router.get("/", (req, res) => {
  const list = Object.values(TEMPLATES).map(({ id, name, author, description, icon, acts, chapters }) => ({
    id,
    name,
    author,
    description,
    icon,
    acts,
    chapterCount: chapters.length,
  }));
  res.json(list);
});

// ── GET /api/story-templates/:id
// Devuelve una plantilla completa con sus capítulos
router.get("/:id", (req, res) => {
  const template = TEMPLATES[req.params.id];
  if (!template) return res.status(404).json({ error: "Plantilla no encontrada" });
  res.json(template);
});

// ── POST /api/story-templates/:id/apply
// Aplica una plantilla a una historia: crea los capítulos vacíos
router.post("/:id/apply", verifyToken, async (req, res) => {
  const template = TEMPLATES[req.params.id];
  if (!template) return res.status(404).json({ error: "Plantilla no encontrada" });

  const { storyId } = req.body;
  if (!storyId) return res.status(400).json({ error: "storyId es obligatorio" });

  try {
    // Verificar que la historia pertenece al usuario
    const story = await prisma.story.findFirst({
      where: { id: Number(storyId), userId: req.user.id },
    });
    if (!story) return res.status(403).json({ error: "Historia no encontrada o sin acceso" });

    // Contar capítulos actuales para saber desde qué order empezar
    const existingCount = await prisma.chapter.count({ where: { storyId: Number(storyId) } });

    // Crear los capítulos de la plantilla
    // NOTA: ajusta los campos según tu modelo Chapter en Prisma
    const chapters = await prisma.$transaction(
      template.chapters.map((ch) =>
        prisma.chapter.create({
          data: {
            storyId: Number(storyId),
            title: ch.title,
            content: `<!-- ${ch.description} -->`, // placeholder en TipTap
            order: existingCount + ch.order,
            // Si tu modelo tiene un campo 'act' o 'description', añádelo aquí:
            // act: ch.act,
          },
        })
      )
    );

    res.json({
      message: `Plantilla "${template.name}" aplicada. Se crearon ${chapters.length} capítulos.`,
      chapters,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
