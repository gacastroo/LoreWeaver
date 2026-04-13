import { createContext, useContext, useState, useEffect } from "react"

const AppContext = createContext(null)

export const traducciones = {
  es: {
    // Sidebar - Nav
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
    // Logout modal
    logoutTitle: "¿Seguro que deseas cerrar sesión?",
    logoutDesc: "Perderás el acceso hasta que inicies sesión de nuevo.",
    cancelar: "Cancelar",
    confirmar: "Cerrar sesión",
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