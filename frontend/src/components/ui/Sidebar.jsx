import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "@/services/api";
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Globe,
  Layers,
  Film,
  Bookmark,
  Map,
  User,
  Lightbulb,
  Plus,
} from "lucide-react";

export default function Sidebar() {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await API.get("/historias"); // asegúrate de que tu backend tenga esta ruta
        setUserStories(res.data);
      } catch (err) {
        console.error("❌ Error al cargar historias en sidebar:", err);
      }
    };

    fetchStories();
  }, []);

  return (
<aside className="w-64 h-screen overflow-y-auto bg-white border-r shadow-sm p-4 flex flex-col scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 hover:scrollbar-thumb-neutral-400 transition-all duration-300 ease-in-out">
  <div>
        {/* Logo */}
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 mb-6 px-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="LoreWeaver Logo"
            className="w-50 h-50 object-contain"
          />
        </NavLink>

        {/* Navegación principal */}
        <nav className="flex flex-col gap-1 text-sm">
          <NavLink to="/dashboard" className="nav-link">
            <LayoutDashboard className="icon" />
            Dashboard
          </NavLink>
          <NavLink to="/stories" className="nav-link">
            <BookOpen className="icon" />
            Historias
          </NavLink>
          <NavLink to="/characters" className="nav-link">
            <Users className="icon" />
            Personajes
          </NavLink>
          <NavLink to="/universes" className="nav-link">
            <Globe className="icon" />
            Universos
          </NavLink>
          <NavLink to="/chapters" className="nav-link">
            <Layers className="icon" />
            Capitulos
          </NavLink>
          <NavLink to="/scenes" className="nav-link">
            <Film className="icon" />
            Escenas
          </NavLink>
          <NavLink to="/tags" className="nav-link">
            <Bookmark className="icon" />
            Tags
          </NavLink>
        </nav>

        {/* Herramientas */}
        <div className="border-t my-4 pt-4">
          <h2 className="text-xs uppercase text-gray-400 px-2 mb-2">Herramientas</h2>
          <nav className="flex flex-col gap-1 text-sm">
            <NavLink to="/map-generator" className="nav-link">
              <Map className="icon" />
              Generador de Mapa
            </NavLink>
            <NavLink to="/name-generator" className="nav-link">
              <User className="icon" />
              Generador de Nombres
            </NavLink>
            <NavLink to="/idea-generator" className="nav-link">
              <Lightbulb className="icon" />
              Generador de Ideas
            </NavLink>
          </nav>
        </div>

        {/* Tus historias (dinámicas) */}
        <div className="border-t mt-4 pt-4">
          <h2 className="text-xs uppercase text-gray-400 px-2 mb-2">
            Tus historias
          </h2>
          <nav className="flex flex-col gap-1 text-sm">
            {userStories.length > 0 ? (
              userStories.map((story) => (
                <NavLink key={story.id} to={`/historia/${story.id}`} className="nav-link">
                  <BookOpen className="icon" />
                  {story.titulo}
                </NavLink>
              ))
            ) : (
              <span className="text-xs text-neutral-400 px-2">No hay historias</span>
            )}
            <NavLink
              to="/new-story"
              className="nav-link text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="icon" />
              Nueva historia
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
}
