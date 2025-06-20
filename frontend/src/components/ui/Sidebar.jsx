import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen, LayoutDashboard, Users, Globe, Layers,
  Film, Bookmark, Map, User, Lightbulb, LogOut, Menu
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Botón para abrir/cerrar sidebar en móviles */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md border
          transition-opacity duration-300
          ${sidebarOpen ? "opacity-100" : "opacity-30"}
        `}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay al abrir sidebar en móviles */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar responsive */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-white border-r shadow-sm p-4 flex flex-col justify-between 
        transition-transform transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:flex
      `}>
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-6 px-2">
            <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
              <img src="/logo.png" alt="LoreWeaver Logo" className="w-36 object-contain" />
            </NavLink>
          </div>

          {/* Navegación */}
          <nav className="flex flex-col gap-1 text-sm">
            <NavLink to="/dashboard" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <LayoutDashboard className="icon" /> Dashboard
            </NavLink>
            <NavLink to="/stories" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <BookOpen className="icon" /> Historias
            </NavLink>
            <NavLink to="/characters" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <Users className="icon" /> Personajes
            </NavLink>
            <NavLink to="/universes" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <Globe className="icon" /> Universos
            </NavLink>
            <NavLink to="/chapters" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <Layers className="icon" /> Capítulos
            </NavLink>
            <NavLink to="/scenes" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <Film className="icon" /> Escenas
            </NavLink>
            <NavLink to="/tags" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <Bookmark className="icon" /> Tags
            </NavLink>
          </nav>

          {/* Herramientas */}
          <div className="border-t my-4 pt-4">
            <h2 className="text-xs uppercase text-gray-400 px-2 mb-2">Herramientas</h2>
            <nav className="flex flex-col gap-1 text-sm">
              <NavLink to="/map-generator" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <Map className="icon" /> Generador de Mapa
              </NavLink>
              <NavLink to="/name-generator" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <User className="icon" /> Generador de Nombres
              </NavLink>
              <NavLink to="/idea-generator" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <Lightbulb className="icon" /> Generador de Ideas
              </NavLink>
              <NavLink to="/chat" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <Lightbulb className="icon" /> Chat Narrativo
              </NavLink>
              <NavLink to="/guia" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <BookOpen className="icon" /> Guía de Uso
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <button
          onClick={() => {
            setSidebarOpen(false);
            setShowLogoutModal(true);
          }}
          className="flex items-center gap-2 text-sm font-medium text-white-700 hover:text-red-600 transition rounded px-3 py-2 mt-6 border hover:border-red-600"
        >
          <LogOut className="icon" />
          Cerrar sesión
        </button>
      </aside>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 rounded-md p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-2">¿Seguro que deseas cerrar sesión?</h3>
            <p className="text-sm text-gray-500 mb-4">Perderás el acceso hasta que inicies sesión de nuevo.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
