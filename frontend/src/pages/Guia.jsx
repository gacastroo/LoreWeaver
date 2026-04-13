import { color } from "framer-motion"
import { useState, useMemo } from "react"

const secciones = [
  {
    id: "historia",
    icono: "📖",
    titulo: "Historia",
    subtitulo: "El eje central de tu proyecto",
    color: "#a78bfa",
    pasos: [
      { label: "Crear", desc: "Ve al Dashboard y pulsa 'Nueva historia'. Dale un título que represente tu obra." },
      { label: "Escribir", desc: "Añade capítulos uno por uno desde el editor. Cada capítulo es un episodio de tu narrativa." },
      { label: "Organizar", desc: "Reordena o elimina capítulos cuando la trama lo pida. Todo queda guardado automáticamente." },
      { label: "Exportar", desc: "Exporta la historia completa en PDF para compartirla o imprimirla." },
    ],
    tips: ["Los personajes, universos y escenas se vinculan a la historia para tenerlo todo conectado.", "Usa el mapa de relaciones para ver el estado general de tu historia de un vistazo."],
  },
  {
    id: "personaje",
    icono: "🧑‍🎤",
    titulo: "Personaje",
    subtitulo: "Protagonistas, villanos y seres del mundo",
    color: "#34d399",
    pasos: [
      { label: "Crear", desc: "Ve a la sección Personajes y pulsa 'Nuevo personaje'. Asigna un nombre y vincula una historia." },
      { label: "Describir", desc: "Edita la descripción como si fuera una ficha de rol o una biografía extendida." },
      { label: "Etiquetar", desc: "Añade tags para clasificar: 'protagonista', 'antagonista', 'magia', etc." },
      { label: "Exportar", desc: "Exporta su ficha en PDF para compartirla con colaboradores o jugadores." },
    ],
    tips: ["Desde el perfil del personaje puedes ir directamente a su historia para verlo en contexto.", "El Chat Narrativo puede ayudarte a desarrollar la voz y motivaciones del personaje."],
  },
  {
    id: "universo",
    icono: "🌌",
    titulo: "Universo",
    subtitulo: "El mundo donde vive tu historia",
    color: "#60a5fa",
    pasos: [
      { label: "Crear", desc: "Crea un universo con su nombre y descripción: 'Planeta Aether, gobernado por clanes de luz'." },
      { label: "Vincular", desc: "Asócialo a una historia para mantener todo conectado dentro del mismo proyecto." },
      { label: "Editar", desc: "Actualiza su lore y geografía a medida que tu mundo narrativo evoluciona." },
      { label: "Exportar", desc: "Exporta el universo en PDF para documentación o presentación a colaboradores." },
    ],
    tips: ["Un universo puede compartirse entre varias historias si así lo requiere tu saga.", "Describe la física, magia y política del universo en el campo de descripción."],
  },
  {
    id: "capitulo",
    icono: "📄",
    titulo: "Capítulo",
    subtitulo: "Fragmentos de tu historia",
    color: "#f59e0b",
    pasos: [
      { label: "Añadir", desc: "Desde el editor de historia, pulsa 'Nuevo capítulo' y dale un título como 'El despertar'." },
      { label: "Escribir", desc: "Usa el editor de texto enriquecido para redactar el contenido del capítulo." },
      { label: "Reordenar", desc: "Arrastra los capítulos para cambiar su orden dentro de la historia." },
      { label: "Revisar", desc: "Edita o elimina capítulos en cualquier momento desde el listado." },
    ],
    tips: ["El capítulo puede tener múltiples escenas vinculadas para detallar momentos específicos.", "Usa el Chat Narrativo con un capítulo seleccionado para pedir ideas de continuación."],
  },
  {
    id: "escena",
    icono: "🎬",
    titulo: "Escena",
    subtitulo: "Momentos específicos de un capítulo",
    color: "#f87171",
    pasos: [
      { label: "Crear", desc: "Crea escenas vinculadas a un capítulo: 'Combate en el bosque', 'Reunión secreta'." },
      { label: "Ordenar", desc: "Establece el orden de la escena dentro del capítulo para mantener el flujo narrativo." },
      { label: "Navegar", desc: "Desde una escena puedes ir directamente al capítulo y la historia que la contienen." },
      { label: "Gestionar", desc: "Edita o elimina escenas según evolucione la trama." },
    ],
    tips: ["Las escenas también pueden estar vinculadas a un universo para dar contexto geográfico.", "Úsalas para dividir un capítulo largo en beats narrativos más manejables."],
  },
  {
    id: "mapa",
    icono: "🗺️",
    titulo: "Mapa de relaciones",
    subtitulo: "Vista visual de todos tus elementos",
    color: "#a78bfa",
    pasos: [
      { label: "Generar", desc: "Accede al mapa desde una historia. Se genera automáticamente con todos sus elementos." },
      { label: "Explorar", desc: "Nodos conectados muestran cómo se relacionan historias, personajes, universos y escenas." },
      { label: "Filtrar", desc: "Filtra por tipo de elemento para enfocarte solo en personajes, o solo en escenas, etc." },
      { label: "Exportar", desc: "Exporta el mapa como PNG o PDF para compartirlo con tu equipo o presentarlo." },
    ],
    tips: ["Ideal para escritores visuales que necesitan ver la estructura antes de escribir.", "Si el mapa se ve denso, usa los filtros para explorar una capa a la vez."],
  },
  {
    id: "nombres",
    icono: "✨",
    titulo: "Generador de nombres",
    subtitulo: "Inspiración para personajes y lugares",
    color: "#34d399",
    pasos: [
      { label: "Elegir estilo", desc: "Selecciona una categoría: fantasía, ciencia ficción, medieval, moderno, etc." },
      { label: "Generar", desc: "Pulsa 'Generar' y obtén una lista de nombres únicos para tu mundo." },
      { label: "Usar", desc: "Crea un personaje directamente con el nombre que más te guste sin salir de la página." },
    ],
    tips: ["Genera varias veces hasta encontrar uno que encaje con la personalidad del personaje.", "Funciona igual de bien para nombrar lugares, facciones o artefactos mágicos."],
  },
  {
    id: "ideas",
    icono: "🧠",
    titulo: "Generador de ideas",
    subtitulo: "Rompe el bloqueo creativo con IA",
    color: "#60a5fa",
    pasos: [
      { label: "Escribir temática", desc: "Escribe el título o tema de tu historia: 'Una rebelión en un mundo gobernado por máquinas'." },
      { label: "Generar", desc: "La IA produce una idea narrativa completa: trama, conflicto principal y personajes sugeridos." },
      { label: "Iterar", desc: "No te gusta el resultado? Ajusta el título y genera de nuevo hasta encontrar la chispa." },
    ],
    tips: ["Cuanto más específico sea el título, más útil será la idea generada.", "Puedes usar la idea como punto de partida y luego desarrollarla con el Chat Narrativo."],
  },
  {
    id: "chat",
    icono: "🤖",
    titulo: "Chat narrativo",
    subtitulo: "Tu asistente de escritura con contexto",
    color: "#f59e0b",
    pasos: [
      { label: "Seleccionar entidad", desc: "Elige si quieres chatear sobre un capítulo, personaje o universo de tu proyecto." },
      { label: "Seleccionar elemento", desc: "Escoge el capítulo, personaje o universo concreto. La IA recibirá su contexto." },
      { label: "Conversar", desc: "Pregunta, pide continuación de trama, simula diálogos o solicita feedback narrativo." },
      { label: "Iterar", desc: "La conversación mantiene historial. Puedes refinar o explorar distintas direcciones." },
    ],
    tips: ["La IA conoce el nombre, descripción y elementos relacionados del item que seleccionas.", "Prueba: 'Continúa esta escena desde la perspectiva del antagonista'."],
  },
]

function PasosStepper({ pasos, color }) {
  const [activo, setActivo] = useState(0)
  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ display: "flex", gap: "6px", marginBottom: "1rem", flexWrap: "wrap" }}>
        {pasos.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivo(i)}
            style={{
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              border: `1px solid ${activo === i ? color : "rgba(255,255,255,0.15)"}`,
              background: activo === i ? `${color}22` : "transparent",
              color: activo === i ? color : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {i + 1}. {p.label}
          </button>
        ))}
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${color}44`,
          borderLeft: `3px solid ${color}`,
          borderRadius: "6px",
          padding: "12px 16px",
          fontSize: "14px",
          color: "rgba(255,255,255,0.8)",
          lineHeight: "1.6",
          minHeight: "52px",
        }}
      >
        {pasos[activo].desc}
      </div>
    </div>
  )
}

function TipsAccordion({ tips }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <div style={{ marginTop: "12px" }}>
      <button
        onClick={() => setAbierto(v => !v)}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.4)",
          fontSize: "12px",
          fontFamily: "Rajdhani, sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: 0,
        }}
      >
        <span style={{ transition: "transform 0.2s", display: "inline-block", transform: abierto ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        Consejos
      </button>
      {abierto && (
        <ul style={{ margin: "8px 0 0 0", padding: "0 0 0 16px", listStyle: "none" }}>
          {tips.map((t, i) => (
            <li
              key={i}
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: "1.6",
                marginBottom: "6px",
                paddingLeft: "12px",
                borderLeft: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SeccionCard({ s, completada, onToggleCompleta }) {
  const [expandida, setExpandida] = useState(false)

  return (
    <div
      style={{
        background: expandida ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${expandida ? s.color + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "10px",
        overflow: "hidden",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      <button
        onClick={() => setExpandida(v => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "20px", lineHeight: 1 }}>{s.icono}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "Bebas Neue, Orbitron, monospace",
                fontSize: "17px",
                letterSpacing: "0.08em",
                color: expandida ? s.color : "rgba(255,255,255,0.9)",
                transition: "color 0.2s",
              }}
            >
              {s.titulo}
            </span>
            {completada && (
              <span
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  background: `${s.color}22`,
                  color: s.color,
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                VISTO
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Rajdhani, sans-serif",
              marginTop: "2px",
            }}
          >
            {s.subtitulo}
          </div>
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "12px",
            transition: "transform 0.2s",
            transform: expandida ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      {expandida && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ width: "100%", height: "1px", background: `${s.color}33`, marginBottom: "16px" }} />
          <PasosStepper pasos={s.pasos} color={s.color} />
          <TipsAccordion tips={s.tips} />
          <div style={{ marginTop: "14px", textAlign: "right" }}>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleCompleta() }}
              style={{
                fontSize: "12px",
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: completada ? "rgba(255,255,255,0.06)" : `${s.color}22`,
                border: `1px solid ${completada ? "rgba(255,255,255,0.15)" : s.color + "66"}`,
                color: completada ? "rgba(255,255,255,0.4)" : s.color,
                padding: "6px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {completada ? "✓ Marcar como no visto" : "Marcar como visto"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Guia() {
  const [busqueda, setBusqueda] = useState("")
  const [completadas, setCompletadas] = useState(new Set())

  const filtradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim()
    if (!q) return secciones
    return secciones.filter(
      s =>
        s.titulo.toLowerCase().includes(q) ||
        s.subtitulo.toLowerCase().includes(q) ||
        s.pasos.some(p => p.desc.toLowerCase().includes(q) || p.label.toLowerCase().includes(q)) ||
        s.tips.some(t => t.toLowerCase().includes(q))
    )
  }, [busqueda])

  const toggleCompleta = (id) => {
    setCompletadas(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const progreso = Math.round((completadas.size / secciones.length) * 100)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        padding: "32px 24px",
        fontFamily: "Rajdhani, sans-serif",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "Bebas Neue, Orbitron, monospace",
              fontSize: "clamp(28px, 5vw, 42px)",
              letterSpacing: "0.12em",
              color: "#fff",
              margin: "0 0 6px 0",
            }}
          >
          <img src="/logo.png"  alt="LoreWeaver"  style="filter: grayscale(100%); -webkit-filter: grayscale(100%);"/> Guía LoreWeaver
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
            Todo lo que necesitas para construir tu mundo narrativo.
          </p>
        </div>

        {/* Barra de progreso */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "14px 18px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Progreso
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                {completadas.size}/{secciones.length} secciones
              </span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progreso}%`,
                  background: progreso === 100 ? "#34d399" : "#a78bfa",
                  borderRadius: "3px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
          <span
            style={{
              fontFamily: "Bebas Neue, monospace",
              fontSize: "22px",
              color: progreso === 100 ? "#34d399" : "#a78bfa",
              minWidth: "44px",
              textAlign: "right",
            }}
          >
            {progreso}%
          </span>
        </div>

        {/* Buscador */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.3)",
              fontSize: "14px",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar en la guía..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              padding: "10px 14px 10px 38px",
              color: "#fff",
              fontSize: "14px",
              fontFamily: "Rajdhani, sans-serif",
              outline: "none",
            }}
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.3)",
                cursor: "pointer",
                fontSize: "16px",
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Secciones */}
        {filtradas.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "rgba(255,255,255,0.3)",
              fontSize: "14px",
            }}
          >
            No hay resultados para "{busqueda}"
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtradas.map(s => (
              <SeccionCard
                key={s.id}
                s={s}
                completada={completadas.has(s.id)}
                onToggleCompleta={() => toggleCompleta(s.id)}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "rgba(255,255,255,0.2)",
            fontSize: "12px",
            letterSpacing: "0.06em",
          }}
        >
          LOREWEAVER — TU MUNDO, TU HISTORIA
        </div>
      </div>
    </div>
  )
}