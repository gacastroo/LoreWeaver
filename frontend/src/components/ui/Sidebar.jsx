import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen, LayoutDashboard, Users, Globe, Layers,
  Film, Bookmark, Map, User, Lightbulb, LogOut, Menu,
  Sun, Moon
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme, idioma, toggleIdioma, t } = useApp();
  const isLight = theme === "light";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  const sidebarHiddenForA11y = isMobile && !sidebarOpen;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <button
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-md shadow-md border transition-opacity duration-300
          ${isLight ? "bg-white border-gray-200" : "bg-zinc-800 border-zinc-700"}
          ${sidebarOpen ? "opacity-100" : "opacity-30"}
        `}
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={sidebarOpen}
        aria-controls="app-sidebar"
      >
        <Menu aria-hidden="true" className={`w-6 h-6 ${isLight ? "text-gray-700" : "text-gray-200"}`} />
      </button>

      {sidebarOpen && (
        <button
          type="button"
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-40 cursor-default"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        id="app-sidebar"
        aria-label="Barra lateral de navegación"
        aria-hidden={sidebarHiddenForA11y}
        inert={sidebarHiddenForA11y ? "" : undefined}
        className={`
        fixed top-0 left-0 z-40 h-full w-64 p-4 flex flex-col justify-between
        transition-all duration-300 transform border-r
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:flex
        ${isLight
          ? "bg-white border-gray-200 text-gray-800"
          : "bg-zinc-900 border-zinc-700 text-gray-100"}
      `}>
        <div>
          {/* Logo + controles */}
          <div className="flex items-center justify-between mb-6 px-2">
            <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)} aria-label="Ir al panel principal">
              <img
                src="/logo-512.webp"
                alt="LoreWeaver Logo"
                width={128}
                height={128}
                loading="lazy"
                decoding="async"
                className={`w-32 h-32 object-contain ${isLight ? "" : "invert"}`}
              />
            </NavLink>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleTheme}
                title={isLight ? "Modo oscuro" : "Modo claro"}
                aria-label={isLight ? "Activar modo oscuro" : "Activar modo claro"}
                style={{ padding: "6px", background: "transparent", border: "none" }}
                className={`rounded-md transition-colors ${isLight ? "text-gray-500 hover:bg-gray-100" : "text-gray-400 hover:bg-zinc-700"}`}
              >
                {isLight ? <Moon aria-hidden="true" className="w-4 h-4" /> : <Sun aria-hidden="true" className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={toggleIdioma}
                title={idioma === "es" ? "Switch to English" : "Cambiar a Español"}
                aria-label={idioma === "es" ? "Cambiar idioma a inglés" : "Cambiar idioma a español"}
                style={{ padding: "4px 7px", background: "transparent", border: "none", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}
                className={`rounded-md transition-colors ${isLight ? "text-gray-500 hover:bg-gray-100" : "text-gray-400 hover:bg-zinc-700"}`}
              >
                {idioma === "es" ? "EN" : "ES"}
              </button>
            </div>
          </div>

          {/* Nav principal */}
          <nav className="flex flex-col gap-1 text-sm" aria-label="Navegación principal">
            <NavLink to="/dashboard" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
              <LayoutDashboard aria-hidden="true" className="icon" /> {t.dashboard}
            </NavLink>
            <NavLink to="/stories" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
              <BookOpen aria-hidden="true" className="icon" /> {t.historias}
            </NavLink>
            <NavLink to="/characters" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
              <Users aria-hidden="true" className="icon" /> {t.personajes}
            </NavLink>
            <NavLink to="/universes" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
              <Globe aria-hidden="true" className="icon" /> {t.universos}
            </NavLink>
            <NavLink to="/chapters" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
              <Layers aria-hidden="true" className="icon" /> {t.capitulos}
            </NavLink>
            <NavLink to="/scenes" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
              <Film aria-hidden="true" className="icon" /> {t.escenas}
            </NavLink>
            <NavLink to="/tags" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
              <Bookmark aria-hidden="true" className="icon" /> {t.tags}
            </NavLink>
          </nav>

          {/* Herramientas */}
          <div className={`border-t my-4 pt-4 ${isLight ? "border-gray-200" : "border-zinc-700"}`}>
            <h2 className={`text-xs uppercase px-2 mb-2 ${isLight ? "text-gray-600" : "text-zinc-400"}`}>
              {t.herramientas}
            </h2>
            <nav className="flex flex-col gap-1 text-sm" aria-label="Herramientas">
              <NavLink to="/map-generator" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
                <Map aria-hidden="true" className="icon" /> {t.genMapa}
              </NavLink>
              <NavLink to="/name-generator" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
                <User aria-hidden="true" className="icon" /> {t.genNombres}
              </NavLink>
              <NavLink to="/idea-generator" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
                <Lightbulb aria-hidden="true" className="icon" /> {t.genIdeas}
              </NavLink>
              <NavLink to="/chat" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
                <Lightbulb aria-hidden="true" className="icon" /> {t.chatNarrativo}
              </NavLink>
              <NavLink to="/guia" className={`nav-link ${isLight ? "" : "nav-link-dark"}`} onClick={() => setSidebarOpen(false)}>
                <BookOpen aria-hidden="true" className="icon" /> {t.guiaUso}
              </NavLink>
            </nav>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { setSidebarOpen(false); setShowLogoutModal(true); }}
          style={{ background: "transparent" }}
          className={`flex items-center gap-2 text-sm font-medium transition rounded px-3 py-2 mt-6 border hover:border-red-600 hover:text-red-600
            ${isLight ? "text-gray-700 border-gray-200" : "text-gray-300 border-zinc-700"}
          `}
        >
          <LogOut aria-hidden="true" className="icon" />
          {t.cerrarSesion}
        </button>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black bg-opacity-40 cursor-default"
            aria-label="Cerrar confirmación de cierre de sesión"
            onClick={() => setShowLogoutModal(false)}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            tabIndex={-1}
            className={`relative rounded-md p-6 w-full max-w-sm shadow-lg ${isLight ? "bg-white text-gray-800" : "bg-zinc-800 text-gray-100"}`}
          >
            <h3 id="logout-dialog-title" className="text-lg font-semibold mb-2">{t.logoutTitle}</h3>
            <p className={`text-sm mb-4 ${isLight ? "text-gray-500" : "text-zinc-400"}`}>{t.logoutDesc}</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                style={{ background: undefined }}
                className={`px-4 py-2 text-sm rounded-md transition ${isLight ? "bg-gray-100 hover:bg-gray-200" : "bg-zinc-700 hover:bg-zinc-600"}`}
              >
                {t.cancelar}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                {t.confirmar}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
