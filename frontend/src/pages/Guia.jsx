import { useState, useMemo, useEffect, useRef } from "react"
import { useApp } from "@/context/AppContext"

// ─── Contenido bilingüe ────────────────────────────────────────────────────

const secciones = {
  es: [
    {
      id: "historia", icono: "📖", titulo: "Historia", subtitulo: "El eje central de tu proyecto", color: "#a78bfa",
      pasos: [
        { label: "Crear", desc: "Ve al Dashboard y pulsa 'Nueva historia'. Dale un título que represente tu obra." },
        { label: "Escribir", desc: "Añade capítulos uno por uno desde el editor. Cada capítulo es un episodio de tu narrativa." },
        { label: "Organizar", desc: "Reordena o elimina capítulos cuando la trama lo pida. Todo queda guardado automáticamente." },
        { label: "Exportar", desc: "Exporta la historia completa en PDF para compartirla o imprimirla." },
      ],
      tips: ["Los personajes, universos y escenas se vinculan a la historia para tenerlo todo conectado.", "Usa el mapa de relaciones para ver el estado general de tu historia de un vistazo."],
      badge: "Base",
    },
    {
      id: "personaje", icono: "🧑‍🎤", titulo: "Personaje", subtitulo: "Protagonistas, villanos y seres del mundo", color: "#34d399",
      pasos: [
        { label: "Crear", desc: "Ve a la sección Personajes y pulsa 'Nuevo personaje'. Asigna un nombre y vincula una historia." },
        { label: "Describir", desc: "Edita la descripción como si fuera una ficha de rol o una biografía extendida." },
        { label: "Etiquetar", desc: "Añade tags para clasificar: 'protagonista', 'antagonista', 'magia', etc." },
        { label: "Exportar", desc: "Exporta su ficha en PDF para compartirla con colaboradores o jugadores." },
      ],
      tips: ["Desde el perfil del personaje puedes ir directamente a su historia para verlo en contexto.", "El Chat Narrativo puede ayudarte a desarrollar la voz y motivaciones del personaje."],
      badge: "Núcleo",
    },
    {
      id: "universo", icono: "🌌", titulo: "Universo", subtitulo: "El mundo donde vive tu historia", color: "#60a5fa",
      pasos: [
        { label: "Crear", desc: "Crea un universo con su nombre y descripción: 'Planeta Aether, gobernado por clanes de luz'." },
        { label: "Vincular", desc: "Asócialo a una historia para mantener todo conectado dentro del mismo proyecto." },
        { label: "Editar", desc: "Actualiza su lore y geografía a medida que tu mundo narrativo evoluciona." },
        { label: "Exportar", desc: "Exporta el universo en PDF para documentación o presentación a colaboradores." },
      ],
      tips: ["Un universo puede compartirse entre varias historias si así lo requiere tu saga.", "Describe la física, magia y política del universo en el campo de descripción."],
      badge: "Mundo",
    },
    {
      id: "capitulo", icono: "📄", titulo: "Capítulo", subtitulo: "Fragmentos de tu historia", color: "#f59e0b",
      pasos: [
        { label: "Añadir", desc: "Desde el editor de historia, pulsa 'Nuevo capítulo' y dale un título como 'El despertar'." },
        { label: "Escribir", desc: "Usa el editor de texto enriquecido para redactar el contenido del capítulo." },
        { label: "Reordenar", desc: "Arrastra los capítulos para cambiar su orden dentro de la historia." },
        { label: "Revisar", desc: "Edita o elimina capítulos en cualquier momento desde el listado." },
      ],
      tips: ["El capítulo puede tener múltiples escenas vinculadas para detallar momentos específicos.", "Usa el Chat Narrativo con un capítulo seleccionado para pedir ideas de continuación."],
      badge: "Escritura",
    },
    {
      id: "escena", icono: "🎬", titulo: "Escena", subtitulo: "Momentos específicos de un capítulo", color: "#f87171",
      pasos: [
        { label: "Crear", desc: "Crea escenas vinculadas a un capítulo: 'Combate en el bosque', 'Reunión secreta'." },
        { label: "Ordenar", desc: "Establece el orden de la escena dentro del capítulo para mantener el flujo narrativo." },
        { label: "Navegar", desc: "Desde una escena puedes ir directamente al capítulo y la historia que la contienen." },
        { label: "Gestionar", desc: "Edita o elimina escenas según evolucione la trama." },
      ],
      tips: ["Las escenas también pueden estar vinculadas a un universo para dar contexto geográfico.", "Úsalas para dividir un capítulo largo en beats narrativos más manejables."],
      badge: "Detalle",
    },
    {
      id: "mapa", icono: "🗺️", titulo: "Mapa de relaciones", subtitulo: "Vista visual de todos tus elementos", color: "#a78bfa",
      pasos: [
        { label: "Generar", desc: "Accede al mapa desde una historia. Se genera automáticamente con todos sus elementos." },
        { label: "Explorar", desc: "Nodos conectados muestran cómo se relacionan historias, personajes, universos y escenas." },
        { label: "Filtrar", desc: "Filtra por tipo de elemento para enfocarte solo en personajes, o solo en escenas, etc." },
        { label: "Exportar", desc: "Exporta el mapa como PNG o PDF para compartirlo con tu equipo o presentarlo." },
      ],
      tips: ["Ideal para escritores visuales que necesitan ver la estructura antes de escribir.", "Si el mapa se ve denso, usa los filtros para explorar una capa a la vez."],
      badge: "Visual",
    },
    {
      id: "nombres", icono: "✨", titulo: "Generador de nombres", subtitulo: "Inspiración para personajes y lugares", color: "#34d399",
      pasos: [
        { label: "Elegir estilo", desc: "Selecciona una categoría: fantasía, ciencia ficción, medieval, moderno, etc." },
        { label: "Generar", desc: "Pulsa 'Generar' y obtén una lista de nombres únicos para tu mundo." },
        { label: "Usar", desc: "Crea un personaje directamente con el nombre que más te guste sin salir de la página." },
      ],
      tips: ["Genera varias veces hasta encontrar uno que encaje con la personalidad del personaje.", "Funciona igual de bien para nombrar lugares, facciones o artefactos mágicos."],
      badge: "IA",
    },
    {
      id: "ideas", icono: "🧠", titulo: "Generador de ideas", subtitulo: "Rompe el bloqueo creativo con IA", color: "#60a5fa",
      pasos: [
        { label: "Escribir temática", desc: "Escribe el título o tema de tu historia: 'Una rebelión en un mundo gobernado por máquinas'." },
        { label: "Generar", desc: "La IA produce una idea narrativa completa: trama, conflicto principal y personajes sugeridos." },
        { label: "Iterar", desc: "¿No te gusta el resultado? Ajusta el título y genera de nuevo hasta encontrar la chispa." },
      ],
      tips: ["Cuanto más específico sea el título, más útil será la idea generada.", "Puedes usar la idea como punto de partida y luego desarrollarla con el Chat Narrativo."],
      badge: "IA",
    },
    {
      id: "chat", icono: "🤖", titulo: "Chat narrativo", subtitulo: "Tu asistente de escritura con contexto", color: "#f59e0b",
      pasos: [
        { label: "Seleccionar entidad", desc: "Elige si quieres chatear sobre un capítulo, personaje o universo de tu proyecto." },
        { label: "Seleccionar elemento", desc: "Escoge el capítulo, personaje o universo concreto. La IA recibirá su contexto." },
        { label: "Conversar", desc: "Pregunta, pide continuación de trama, simula diálogos o solicita feedback narrativo." },
        { label: "Iterar", desc: "La conversación mantiene historial. Puedes refinar o explorar distintas direcciones." },
      ],
      tips: ["La IA conoce el nombre, descripción y elementos relacionados del item que seleccionas.", "Prueba: 'Continúa esta escena desde la perspectiva del antagonista'."],
      badge: "IA",
    },
  ],
  en: [
    {
      id: "historia", icono: "📖", titulo: "Story", subtitulo: "The backbone of your project", color: "#a78bfa",
      pasos: [
        { label: "Create", desc: "Go to the Dashboard and click 'New story'. Give it a title that represents your work." },
        { label: "Write", desc: "Add chapters one by one from the editor. Each chapter is an episode of your narrative." },
        { label: "Organize", desc: "Reorder or delete chapters when the plot demands it. Everything saves automatically." },
        { label: "Export", desc: "Export the complete story as PDF to share or print it." },
      ],
      tips: ["Characters, universes, and scenes link to the story to keep everything connected.", "Use the relationship map to see your story's overall status at a glance."],
      badge: "Core",
    },
    {
      id: "personaje", icono: "🧑‍🎤", titulo: "Character", subtitulo: "Protagonists, villains and world beings", color: "#34d399",
      pasos: [
        { label: "Create", desc: "Go to the Characters section and click 'New character'. Assign a name and link a story." },
        { label: "Describe", desc: "Edit the description as if it were a role-playing sheet or extended biography." },
        { label: "Tag", desc: "Add tags to classify: 'protagonist', 'antagonist', 'magic', etc." },
        { label: "Export", desc: "Export their sheet as PDF to share with collaborators or players." },
      ],
      tips: ["From the character profile you can go directly to their story to see them in context.", "The Narrative Chat can help you develop the character's voice and motivations."],
      badge: "Core",
    },
    {
      id: "universo", icono: "🌌", titulo: "Universe", subtitulo: "The world where your story lives", color: "#60a5fa",
      pasos: [
        { label: "Create", desc: "Create a universe with its name and description: 'Planet Aether, ruled by clans of light'." },
        { label: "Link", desc: "Associate it with a story to keep everything connected within the same project." },
        { label: "Edit", desc: "Update its lore and geography as your narrative world evolves." },
        { label: "Export", desc: "Export the universe as PDF for documentation or presentation to collaborators." },
      ],
      tips: ["A universe can be shared across multiple stories if your saga requires it.", "Describe the physics, magic, and politics of the universe in the description field."],
      badge: "World",
    },
    {
      id: "capitulo", icono: "📄", titulo: "Chapter", subtitulo: "Fragments of your story", color: "#f59e0b",
      pasos: [
        { label: "Add", desc: "From the story editor, click 'New chapter' and give it a title like 'The Awakening'." },
        { label: "Write", desc: "Use the rich text editor to draft the chapter content." },
        { label: "Reorder", desc: "Drag chapters to change their order within the story." },
        { label: "Review", desc: "Edit or delete chapters at any time from the list." },
      ],
      tips: ["A chapter can have multiple linked scenes to detail specific moments.", "Use Narrative Chat with a chapter selected to ask for continuation ideas."],
      badge: "Writing",
    },
    {
      id: "escena", icono: "🎬", titulo: "Scene", subtitulo: "Specific moments within a chapter", color: "#f87171",
      pasos: [
        { label: "Create", desc: "Create scenes linked to a chapter: 'Forest battle', 'Secret meeting'." },
        { label: "Order", desc: "Set the scene's order within the chapter to maintain narrative flow." },
        { label: "Navigate", desc: "From a scene you can go directly to the chapter and story that contain it." },
        { label: "Manage", desc: "Edit or delete scenes as the plot evolves." },
      ],
      tips: ["Scenes can also be linked to a universe to provide geographical context.", "Use them to divide a long chapter into more manageable narrative beats."],
      badge: "Detail",
    },
    {
      id: "mapa", icono: "🗺️", titulo: "Relationship Map", subtitulo: "Visual view of all your elements", color: "#a78bfa",
      pasos: [
        { label: "Generate", desc: "Access the map from a story. It is automatically generated with all its elements." },
        { label: "Explore", desc: "Connected nodes show how stories, characters, universes, and scenes relate." },
        { label: "Filter", desc: "Filter by element type to focus only on characters, or only on scenes, etc." },
        { label: "Export", desc: "Export the map as PNG or PDF to share with your team or present it." },
      ],
      tips: ["Ideal for visual writers who need to see the structure before writing.", "If the map looks dense, use filters to explore one layer at a time."],
      badge: "Visual",
    },
    {
      id: "nombres", icono: "✨", titulo: "Name Generator", subtitulo: "Inspiration for characters and places", color: "#34d399",
      pasos: [
        { label: "Choose style", desc: "Select a category: fantasy, sci-fi, medieval, modern, etc." },
        { label: "Generate", desc: "Click 'Generate' and get a list of unique names for your world." },
        { label: "Use", desc: "Create a character directly with the name you like best without leaving the page." },
      ],
      tips: ["Generate multiple times until you find one that fits the character's personality.", "Works just as well for naming places, factions, or magical artifacts."],
      badge: "AI",
    },
    {
      id: "ideas", icono: "🧠", titulo: "Idea Generator", subtitulo: "Break creative block with AI", color: "#60a5fa",
      pasos: [
        { label: "Write theme", desc: "Write the title or theme of your story: 'A rebellion in a world ruled by machines'." },
        { label: "Generate", desc: "AI produces a complete narrative idea: plot, main conflict, and suggested characters." },
        { label: "Iterate", desc: "Don't like the result? Adjust the title and generate again until you find the spark." },
      ],
      tips: ["The more specific the title, the more useful the generated idea will be.", "You can use the idea as a starting point and develop it further with Narrative Chat."],
      badge: "AI",
    },
    {
      id: "chat", icono: "🤖", titulo: "Narrative Chat", subtitulo: "Your writing assistant with context", color: "#f59e0b",
      pasos: [
        { label: "Select entity", desc: "Choose whether you want to chat about a chapter, character, or universe from your project." },
        { label: "Select element", desc: "Pick the specific chapter, character, or universe. The AI will receive its context." },
        { label: "Converse", desc: "Ask questions, request plot continuations, simulate dialogues, or get narrative feedback." },
        { label: "Iterate", desc: "The conversation maintains history. You can refine or explore different directions." },
      ],
      tips: ["The AI knows the name, description, and related elements of the item you select.", "Try: 'Continue this scene from the antagonist's perspective'."],
      badge: "AI",
    },
  ],
}

const ui = {
  es: {
    titulo: "Guía LoreWeaver",
    subtitulo: "Todo lo que necesitas para construir tu mundo narrativo.",
    progreso: "Progreso",
    secciones: "secciones",
    buscar: "Buscar en la guía...",
    sinResultados: "Sin resultados para",
    footer: "LOREWEAVER — TU MUNDO, TU HISTORIA",
    consejos: "Consejos",
    visto: "VISTO",
    marcarVisto: "Marcar como visto",
    quitarVisto: "✓ Quitar visto",
    completado: "¡Guía completada!",
    filtros: { todos: "Todos", IA: "IA", Core: "Núcleo", Writing: "Escritura", World: "Mundo", Detail: "Detalle", Visual: "Visual", Base: "Base" },
  },
  en: {
    titulo: "LoreWeaver Guide",
    subtitulo: "Everything you need to build your narrative world.",
    progreso: "Progress",
    secciones: "sections",
    buscar: "Search the guide...",
    sinResultados: "No results for",
    footer: "LOREWEAVER — YOUR WORLD, YOUR STORY",
    consejos: "Tips",
    visto: "DONE",
    marcarVisto: "Mark as done",
    quitarVisto: "✓ Unmark",
    completado: "Guide completed!",
    filtros: { todos: "All", IA: "AI", Core: "Core", Writing: "Writing", World: "World", Detail: "Detail", Visual: "Visual", Base: "Core" },
  },
}

// ─── Sub-componentes ───────────────────────────────────────────────────────

function PasosStepper({ pasos, color, isLight }) {
  const [activo, setActivo] = useState(0)

  return (
    <div style={{ marginTop: "1rem" }}>
      {/* Tabs de pasos */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
        {pasos.map((p, i) => (
          <button type="button"
            key={i}
            onClick={() => setActivo(i)}
            style={{
              padding: "5px 13px",
              borderRadius: "20px",
              fontSize: "11px",
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: `1.5px solid ${activo === i ? color : isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"}`,
              background: activo === i ? `${color}20` : "transparent",
              color: activo === i ? color : isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.18s ease",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: activo === i ? color : isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)",
                color: activo === i ? "#fff" : isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            {p.label}
          </button>
        ))}
      </div>

      {/* Panel de descripción con animación */}
      <div
        key={activo}
        style={{
          background: isLight ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${color}40`,
          borderLeft: `3px solid ${color}`,
          borderRadius: "8px",
          padding: "14px 18px",
          fontSize: "13.5px",
          color: isLight ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.78)",
          lineHeight: "1.65",
          minHeight: "56px",
          animation: "fadeSlideIn 0.2s ease",
        }}
      >
        {pasos[activo].desc}
      </div>

      {/* Dots indicadores */}
      <div style={{ display: "flex", gap: "5px", marginTop: "10px", justifyContent: "center" }}>
        {pasos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ver paso ${i + 1}`}
            aria-current={activo === i ? "step" : undefined}
            onClick={() => setActivo(i)}
            style={{
              width: activo === i ? "18px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: activo === i ? color : isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function TipsAccordion({ tips, isLight, label }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div style={{ marginTop: "14px" }}>
      <button
        type="button"
        aria-expanded={abierto}
        onClick={() => setAbierto(v => !v)}
        style={{
          background: "none",
          border: "none",
          color: isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.38)",
          fontSize: "11px",
          fontFamily: "Rajdhani, sans-serif",
          fontWeight: 700,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "2px 0",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: abierto ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            fontSize: "9px",
          }}
        >
          ▶
        </span>
        💡 {label}
        <span style={{
          background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
          borderRadius: "10px",
          padding: "0 6px",
          fontSize: "10px",
        }}>{tips.length}</span>
      </button>

      <div
        style={{
          maxHeight: abierto ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <ul style={{ margin: "10px 0 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
          {tips.map((tip, i) => (
            <li
              key={i}
              style={{
                fontSize: "12.5px",
                color: isLight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.52)",
                lineHeight: "1.6",
                paddingLeft: "14px",
                borderLeft: isLight ? "2px solid rgba(0,0,0,0.09)" : "2px solid rgba(255,255,255,0.1)",
              }}
            >
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function BadgePill({ badge, color }) {
  return (
    <span
      style={{
        fontSize: "9px",
        fontFamily: "Rajdhani, sans-serif",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "2px 7px",
        borderRadius: "10px",
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
        flexShrink: 0,
      }}
    >
      {badge}
    </span>
  )
}

function SeccionCard({ s, completada, onToggleCompleta, isLight, uiText }) {
  const [expandida, setExpandida] = useState(false)
  const contentRef = useRef(null)

  return (
    <div
      style={{
        background: expandida
          ? isLight ? "rgba(0,0,0,0.035)" : "rgba(255,255,255,0.045)"
          : isLight ? "rgba(0,0,0,0.015)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${expandida ? s.color + "50" : isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
        boxShadow: expandida
          ? `0 4px 20px ${s.color}10`
          : "none",
      }}
    >
      {/* Header clickable */}
      <button
        type="button"
        aria-expanded={expandida}
        onClick={() => setExpandida(v => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "13px",
          textAlign: "left",
        }}
      >
        {/* Icono con fondo */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: `${s.color}18`,
            border: `1px solid ${s.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {s.icono}
        </div>

        {/* Textos */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "Bebas Neue, Orbitron, monospace",
                fontSize: "16px",
                letterSpacing: "0.08em",
                color: expandida ? s.color : isLight ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)",
                transition: "color 0.2s",
              }}
            >
              {s.titulo}
            </span>
            <BadgePill badge={s.badge} color={s.color} />
            {completada && (
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  background: "#34d39920",
                  color: "#34d399",
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                ✓ {uiText.visto}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: "11.5px",
              color: isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.38)",
              fontFamily: "Rajdhani, sans-serif",
              marginTop: "2px",
              letterSpacing: "0.02em",
            }}
          >
            {s.subtitulo}
          </div>
        </div>

        {/* Flecha */}
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: expandida ? `${s.color}20` : isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          <span
            style={{
              color: expandida ? s.color : isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)",
              fontSize: "10px",
              transition: "transform 0.25s ease, color 0.2s",
              display: "block",
              transform: expandida ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Contenido expandible */}
      <div
        ref={contentRef}
        style={{
          maxHeight: expandida ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div style={{ padding: "0 20px 20px" }}>
          {/* Divider */}
          <div style={{ width: "100%", height: "1px", background: `${s.color}28`, marginBottom: "16px" }} />

          <PasosStepper pasos={s.pasos} color={s.color} isLight={isLight} />
          <TipsAccordion tips={s.tips} isLight={isLight} label={uiText.consejos} />

          {/* Botón marcar */}
          <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              aria-pressed={completada}
              onClick={(e) => { e.stopPropagation(); onToggleCompleta() }}
              style={{
                fontSize: "11px",
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                background: completada
                  ? isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"
                  : `${s.color}18`,
                border: `1.5px solid ${completada
                  ? isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"
                  : s.color + "55"
                }`,
                color: completada
                  ? isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)"
                  : s.color,
                padding: "7px 16px",
                borderRadius: "7px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {completada ? uiText.quitarVisto : uiText.marcarVisto}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal ──────────────────────────────────────────────────

export default function Guia() {
  const [busqueda, setBusqueda] = useState("")
  const [completadas, setCompletadas] = useState(new Set())
  const [filtroActivo, setFiltroActivo] = useState("todos")
  const { theme, idioma } = useApp()
  const isLight = theme === "light"

  const datos = secciones[idioma] || secciones.es
  const uiText = ui[idioma] || ui.es

  // Paleta según modo
  const pageBg = isLight ? "#f8f8f6" : "#0d0d0d"
  const titleColor = isLight ? "#111" : "#f5f5f5"
  const subtitleColor = isLight ? "rgba(0,0,0,0.42)" : "rgba(255,255,255,0.38)"
  const progressBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"
  const progressBorder = isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.09)"
  const searchBg = isLight ? "rgba(0,0,0,0.035)" : "rgba(255,255,255,0.05)"
  const searchBorder = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
  const searchColor = isLight ? "#111" : "#f0f0f0"
  const footerColor = isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.18)"
  const logoFilter = isLight ? "none" : "invert(1)"

  // Badges únicos para filtros
  const badges = useMemo(() => {
    const all = datos.map(s => s.badge)
    return [...new Set(all)]
  }, [datos])

  // Filtrado combinado: búsqueda + badge
  const filtradas = useMemo(() => {
    let result = datos
    if (filtroActivo !== "todos") {
      result = result.filter(s => s.badge === filtroActivo)
    }
    const q = busqueda.toLowerCase().trim()
    if (!q) return result
    return result.filter(s =>
      s.titulo.toLowerCase().includes(q) ||
      s.subtitulo.toLowerCase().includes(q) ||
      s.pasos.some(p => p.desc.toLowerCase().includes(q) || p.label.toLowerCase().includes(q)) ||
      s.tips.some(tip => tip.toLowerCase().includes(q))
    )
  }, [busqueda, filtroActivo, datos])

  const toggleCompleta = (id) => {
    setCompletadas(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const progreso = Math.round((completadas.size / datos.length) * 100)
  const completadoTotal = completadas.size === datos.length && datos.length > 0

  const getFiltroLabel = (b) => uiText.filtros[b] || b

  return (
    <div style={{ minHeight: "100vh", background: pageBg, padding: "32px 20px 48px", fontFamily: "Rajdhani, sans-serif" }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={{ maxWidth: "740px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "28px", animation: "popIn 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
            <img
              src="/logo-512.webp"
              alt="LoreWeaver"
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              style={{ width: "64px", height: "64px", objectFit: "contain", borderRadius: "12px", filter: logoFilter }}
            />
            <div>
              <h1
                style={{
                  fontFamily: "Bebas Neue, Orbitron, monospace",
                  fontSize: "clamp(26px, 5vw, 40px)",
                  letterSpacing: "0.12em",
                  color: titleColor,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {uiText.titulo}
              </h1>
              <p style={{ color: subtitleColor, fontSize: "13px", margin: "4px 0 0", letterSpacing: "0.01em" }}>
                {uiText.subtitulo}
              </p>
            </div>
          </div>
        </div>

        {/* ── Barra de progreso ── */}
        <div
          style={{
            background: progressBg,
            border: `1px solid ${progressBorder}`,
            borderRadius: "12px",
            padding: "14px 18px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
              <span style={{ fontSize: "11px", color: subtitleColor, letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 700 }}>
                {completadoTotal ? `🎉 ${uiText.completado}` : uiText.progreso}
              </span>
              <span style={{ fontSize: "11px", color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.65)", fontWeight: 700 }}>
                {completadas.size}/{datos.length} {uiText.secciones}
              </span>
            </div>
            <div
              style={{
                height: "5px",
                background: isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.09)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progreso}%`,
                  background: completadoTotal ? "#34d399" : "linear-gradient(90deg, #a78bfa, #60a5fa)",
                  borderRadius: "3px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
          <span
            style={{
              fontFamily: "Bebas Neue, monospace",
              fontSize: "24px",
              color: completadoTotal ? "#34d399" : "#a78bfa",
              minWidth: "48px",
              textAlign: "right",
              letterSpacing: "0.04em",
            }}
          >
            {progreso}%
          </span>
        </div>

        {/* ── Buscador ── */}
        <div style={{ position: "relative", marginBottom: "14px" }}>
          <span
            style={{
              position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)",
              color: subtitleColor, fontSize: "13px", pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <label htmlFor="guide-search" className="sr-only">{uiText.buscar}</label>
          <input
            id="guide-search"
            name="guide-search"
            type="search"
            placeholder={uiText.buscar}
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: searchBg,
              border: `1px solid ${searchBorder}`,
              borderRadius: "9px",
              padding: "10px 36px 10px 36px",
              color: searchColor,
              fontSize: "13px",
              fontFamily: "Rajdhani, sans-serif",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
          {busqueda && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setBusqueda("")}
              style={{
                position: "absolute", right: "11px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: subtitleColor,
                cursor: "pointer", fontSize: "16px", lineHeight: 1, padding: 0,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* ── Filtros por badge ── */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
          <button
            type="button"
            aria-pressed={filtroActivo === "todos"}
            onClick={() => setFiltroActivo("todos")}
            style={{
              padding: "4px 13px",
              borderRadius: "20px",
              fontSize: "11px",
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: `1.5px solid ${filtroActivo === "todos" ? "#a78bfa" : isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
              background: filtroActivo === "todos" ? "#a78bfa18" : "transparent",
              color: filtroActivo === "todos" ? "#a78bfa" : isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.38)",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            {getFiltroLabel("todos")}
          </button>
          {badges.map(b => {
            const sec = datos.find(s => s.badge === b)
            const color = sec?.color || "#a78bfa"
            const isActive = filtroActivo === b
            return (
              <button
                key={b}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFiltroActivo(isActive ? "todos" : b)}
                style={{
                  padding: "4px 13px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border: `1.5px solid ${isActive ? color : isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
                  background: isActive ? `${color}18` : "transparent",
                  color: isActive ? color : isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.38)",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
              >
                {getFiltroLabel(b)}
              </button>
            )
          })}
        </div>

        {/* ── Lista de secciones ── */}
        {filtradas.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "56px 0",
              color: subtitleColor,
              fontSize: "14px",
              fontFamily: "Rajdhani, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔎</div>
            {uiText.sinResultados} "<strong>{busqueda}</strong>"
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {filtradas.map((s, idx) => (
              <div
                key={s.id}
                style={{ animation: `popIn 0.25s ease ${idx * 0.04}s both` }}
              >
                <SeccionCard
                  s={s}
                  completada={completadas.has(s.id)}
                  onToggleCompleta={() => toggleCompleta(s.id)}
                  isLight={isLight}
                  uiText={uiText}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        <div
          style={{
            marginTop: "44px",
            textAlign: "center",
            color: footerColor,
            fontSize: "11px",
            letterSpacing: "0.1em",
            fontFamily: "Bebas Neue, monospace",
          }}
        >
          {uiText.footer}
        </div>
      </div>
    </div>
  )
}
