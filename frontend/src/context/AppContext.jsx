import { createContext, useContext, useState, useEffect } from "react"

const AppContext = createContext(null)

export const traducciones = {
  es: {
    dashboard: "Dashboard",
    historias: "Historias",
    personajes: "Personajes",
    universos: "Universos",
    capitulos: "Capítulos",
    escenas: "Escenas",
    tags: "Tags",
    herramientas: "Herramientas",
    genMapa: "Generador de Mapa",
    genNombres: "Generador de Nombres",
    genIdeas: "Generador de Ideas",
    chatNarrativo: "Chat Narrativo",
    guiaUso: "Guía de Uso",
    cerrarSesion: "Cerrar sesión",
    logoutTitle: "¿Seguro que deseas cerrar sesión?",
    logoutDesc: "Perderás el acceso hasta que inicies sesión de nuevo.",
    cancelar: "Cancelar",
    confirmar: "Cerrar sesión",
    // Dashboard
    dashboardVacio: "¡Tu mundo creativo está vacío!",
    dashboardVacioDesc: "Empieza tu viaje narrativo creando tu primera historia, personaje o universo.",
    guiaInicio: "¿No sabes cómo empezar? Haz click aquí",
    cargando: "Cargando...",
    errorDashboard: "Error al cargar los datos del dashboard.",
    estadisticas: "Estadísticas",
    historiasRecientes: "Historias recientes",
    noEstadisticas: "No hay estadísticas disponibles aún.",
    noHistoriasRecientes: "No hay historias recientes aún.",
    abrir: "Abrir",
    // Stories
    tituloHistorias: "Historias",
    nuevaHistoriaBtn: "Nueva historia",
    cargandoHistorias: "Cargando historias...",
    noHistorias: "No hay historias registradas aún.",
    ultimaEdicion: "Última edición:",
    ninguno: "Ninguno",
    verMas: "Ver más",
    eliminar: "Eliminar",
    asociarPersonaje: "Asociar personaje existente",
    asociarUniverso: "Asociar universo existente",
    // Characters
    tituloPersonajes: "Personajes",
    nuevoPersonajeBtn: "Nuevo personaje",
    cargandoPersonajes: "Cargando personajes...",
    noPersonajes: "No hay personajes.",
    filtrarPorTag: "Filtrar por tag",
    todosLosTags: "Todos los tags",
    sinDescripcion: "Sin descripción",
    sinHistoriaAsignada: "Sin historia asignada",
    asignarHistoria: "+ Asignar historia",
    quitarHistoriaBtn: "Quitar historia",
    quitando: "Quitando...",
    sinEtiquetas: "Sin etiquetas",
    agregarTag: "+ Agregar tag",
    quitarTagBtn: "- Quitar tag",
    historiaLabel: "Historia:",
    // Universes
    tituloUniversos: "Universos",
    nuevoUniversoBtn: "Nuevo universo",
    cargandoUniversos: "Cargando universos...",
    noUniversos: "No hay universos creados todavía.",
    sinDescripcionUniverso: "Sin descripción",
    // Chapters
    tituloCapitulos: "Capítulos",
    nuevoCapituloBtn: "Nuevo capítulo",
    noCapitulos: "No hay capítulos creados todavía.",
    historiaDesconocida: "Desconocida",
    // Scenes
    tituloEscenas: "Escenas",
    nuevaEscenaBtn: "Nueva escena",
    noEscenas: "No hay escenas registradas.",
    capituloLabel: "Capítulo:",
    // Tags
    tituloTags: "Tags",
    nuevoTagBtn: "Nuevo tag",
    noTags: "No hay tags creados todavía.",
    sinPersonajesTag: "Sin personajes",
    // Editors
    editarHistoria: "✍️ Editar Historia",
    editarPersonaje: "✍️ Editar Personaje",
    editarUniverso: "✍️ Editar Universo",
    editarCapitulo: "✍️ Editar Capítulo",
    tituloLabel: "Título",
    nombreLabel: "Nombre",
    descripcionLabel: "Descripción",
    contenidoLabel: "Contenido",
    guardarCambios: "Guardar cambios",
    exportarPDF: "Exportar PDF",
    aniadirCapitulo: "➕ Añadir capítulo",
    minimizar: "Minimizar",
    expandir: "Expandir",
    cargandoHistoria: "Cargando historia...",
    cargandoPersonaje: "Cargando personaje...",
    cargandoUniverso: "Cargando universo...",
    cargandoCapitulo: "Cargando capítulo...",
    irAHistoria: "📖 Ir a historia:",
    verElementosRelacionados: "📚 Ver elementos relacionados",
    // VistaRelaciones
    elementosRelacionados: "Elementos relacionados",
    volver: "Volver",
    noHay: "No hay",
    disponiblesAun: "disponibles aún.",
    masDe: "más",
    // Generadores - Nombres
    genNombresTitle: "🎲 Generador de Nombres Narrativos",
    tipo: "Tipo",
    genero: "Género",
    fantastico: "Fantástico",
    sciFi: "Sci-Fi",
    medieval: "Medieval",
    masculino: "Masculino",
    femenino: "Femenino",
    generarNombre: "Generar Nombre",
    generando: "Generando...",
    nombreGenerado: "Nombre generado",
    descripcionPersonajeLabel: "Descripción del personaje",
    asociarAHistoria: "Asociar a historia",
    crearPersonajeConNombre: "Crear personaje con este nombre",
    usoGenerador: "Usa este generador para obtener nombres únicos y personalizados para tus personajes.",
    // Generadores - Ideas
    genIdeasTitle: "🧠 Generador de Ideas Narrativas",
    tituloHistoriaIdeasPlaceholder: "Título de tu historia...",
    generarIdea: "Generar Idea",
    errorIdea: "Escribe un título para la historia",
    // Chat Narrativo
    chatTitle: "🤖 Chat Narrativo con IA",
    seleccionaElementoError: "Selecciona un elemento válido y escribe un mensaje",
    enviar: "Enviar",
    borrarChat: "Borrar Chat",
    tuLabel: "Tú",
    iaLabel: "IA",
    chatPlaceholder: "Escribe tu pregunta o idea... (Enter para enviar)",
    seleccionaUnLabel: "Selecciona un",
    // Mapa
    mapTitle: "Generador de Mapa Narrativo",
    generarMapa: "Generar Mapa",
    centrarMapa: "Centrar Mapa",
    exportarPNG: "Exportar PNG",
    layoutLabel: "Layout:",
    breadthfirstLabel: "Breadthfirst (Árbol vertical)",
    gridLabel: "Grid (Rejilla)",
    coseLabel: "Cose (Forzado)",
    leyenda: "Leyenda:",
    // Guía
    guiaTitulo: "Guía LoreWeaver",
    guiaSubtitulo: "Todo lo que necesitas para construir tu mundo narrativo.",
    progresoLabel: "Progreso",
    seccionesLabel: "secciones",
    buscarGuia: "Buscar en la guía...",
    sinResultados: "No hay resultados para",
    footerGuia: "LOREWEAVER — TU MUNDO, TU HISTORIA",
  },
  en: {
    dashboard: "Dashboard",
    historias: "Stories",
    personajes: "Characters",
    universos: "Universes",
    capitulos: "Chapters",
    escenas: "Scenes",
    tags: "Tags",
    herramientas: "Tools",
    genMapa: "Map Generator",
    genNombres: "Name Generator",
    genIdeas: "Idea Generator",
    chatNarrativo: "Narrative Chat",
    guiaUso: "User Guide",
    cerrarSesion: "Log out",
    logoutTitle: "Are you sure you want to log out?",
    logoutDesc: "You will lose access until you log in again.",
    cancelar: "Cancel",
    confirmar: "Log out",
    // Dashboard
    dashboardVacio: "Your creative world is empty!",
    dashboardVacioDesc: "Start your narrative journey by creating your first story, character or universe.",
    guiaInicio: "Don't know how to start? Click here",
    cargando: "Loading...",
    errorDashboard: "Error loading dashboard data.",
    estadisticas: "Statistics",
    historiasRecientes: "Recent Stories",
    noEstadisticas: "No statistics available yet.",
    noHistoriasRecientes: "No recent stories yet.",
    abrir: "Open",
    // Stories
    tituloHistorias: "Stories",
    nuevaHistoriaBtn: "New story",
    cargandoHistorias: "Loading stories...",
    noHistorias: "No stories registered yet.",
    ultimaEdicion: "Last edited:",
    ninguno: "None",
    verMas: "View more",
    eliminar: "Delete",
    asociarPersonaje: "Associate existing character",
    asociarUniverso: "Associate existing universe",
    // Characters
    tituloPersonajes: "Characters",
    nuevoPersonajeBtn: "New character",
    cargandoPersonajes: "Loading characters...",
    noPersonajes: "No characters found.",
    filtrarPorTag: "Filter by tag",
    todosLosTags: "All tags",
    sinDescripcion: "No description",
    sinHistoriaAsignada: "No story assigned",
    asignarHistoria: "+ Assign story",
    quitarHistoriaBtn: "Remove story",
    quitando: "Removing...",
    sinEtiquetas: "No tags",
    agregarTag: "+ Add tag",
    quitarTagBtn: "- Remove tag",
    historiaLabel: "Story:",
    // Universes
    tituloUniversos: "Universes",
    nuevoUniversoBtn: "New universe",
    cargandoUniversos: "Loading universes...",
    noUniversos: "No universes created yet.",
    sinDescripcionUniverso: "No description",
    // Chapters
    tituloCapitulos: "Chapters",
    nuevoCapituloBtn: "New chapter",
    noCapitulos: "No chapters created yet.",
    historiaDesconocida: "Unknown",
    // Scenes
    tituloEscenas: "Scenes",
    nuevaEscenaBtn: "New scene",
    noEscenas: "No scenes registered.",
    capituloLabel: "Chapter:",
    // Tags
    tituloTags: "Tags",
    nuevoTagBtn: "New tag",
    noTags: "No tags created yet.",
    sinPersonajesTag: "No characters",
    // Editors
    editarHistoria: "✍️ Edit Story",
    editarPersonaje: "✍️ Edit Character",
    editarUniverso: "✍️ Edit Universe",
    editarCapitulo: "✍️ Edit Chapter",
    tituloLabel: "Title",
    nombreLabel: "Name",
    descripcionLabel: "Description",
    contenidoLabel: "Content",
    guardarCambios: "Save changes",
    exportarPDF: "Export PDF",
    aniadirCapitulo: "➕ Add chapter",
    minimizar: "Minimize",
    expandir: "Expand",
    cargandoHistoria: "Loading story...",
    cargandoPersonaje: "Loading character...",
    cargandoUniverso: "Loading universe...",
    cargandoCapitulo: "Loading chapter...",
    irAHistoria: "📖 Go to story:",
    verElementosRelacionados: "📚 View related elements",
    // VistaRelaciones
    elementosRelacionados: "Related elements",
    volver: "Back",
    noHay: "No",
    disponiblesAun: "available yet.",
    masDe: "more",
    // Generadores - Nombres
    genNombresTitle: "🎲 Narrative Name Generator",
    tipo: "Type",
    genero: "Gender",
    fantastico: "Fantasy",
    sciFi: "Sci-Fi",
    medieval: "Medieval",
    masculino: "Male",
    femenino: "Female",
    generarNombre: "Generate Name",
    generando: "Generating...",
    nombreGenerado: "Generated name",
    descripcionPersonajeLabel: "Character description",
    asociarAHistoria: "Associate to story",
    crearPersonajeConNombre: "Create character with this name",
    usoGenerador: "Use this generator to get unique and personalized names for your characters.",
    // Generadores - Ideas
    genIdeasTitle: "🧠 Narrative Idea Generator",
    tituloHistoriaIdeasPlaceholder: "Your story title...",
    generarIdea: "Generate Idea",
    errorIdea: "Write a title for the story",
    // Chat Narrativo
    chatTitle: "🤖 Narrative Chat with AI",
    seleccionaElementoError: "Select a valid element and write a message",
    enviar: "Send",
    borrarChat: "Clear Chat",
    tuLabel: "You",
    iaLabel: "AI",
    chatPlaceholder: "Write your question or idea... (Enter to send)",
    seleccionaUnLabel: "Select a",
    // Mapa
    mapTitle: "Narrative Map Generator",
    generarMapa: "Generate Map",
    centrarMapa: "Center Map",
    exportarPNG: "Export PNG",
    layoutLabel: "Layout:",
    breadthfirstLabel: "Breadthfirst (Vertical tree)",
    gridLabel: "Grid",
    coseLabel: "Cose (Force-directed)",
    leyenda: "Legend:",
    // Guía
    guiaTitulo: "LoreWeaver Guide",
    guiaSubtitulo: "Everything you need to build your narrative world.",
    progresoLabel: "Progress",
    seccionesLabel: "sections",
    buscarGuia: "Search the guide...",
    sinResultados: "No results for",
    footerGuia: "LOREWEAVER — YOUR WORLD, YOUR STORY",
  },
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("lw-theme") || "dark")
  const [idioma, setIdioma] = useState(() => localStorage.getItem("lw-idioma") || "es")

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.add("light-mode")
      root.classList.remove("dark-mode")
    } else {
      root.classList.add("dark-mode")
      root.classList.remove("light-mode")
    }
    localStorage.setItem("lw-theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("lw-idioma", idioma)
  }, [idioma])

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark")
  const toggleIdioma = () => setIdioma(l => l === "es" ? "en" : "es")

  const t = traducciones[idioma]

  return (
    <AppContext.Provider value={{ theme, toggleTheme, idioma, toggleIdioma, t }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
