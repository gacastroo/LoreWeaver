import { NavLink } from "react-router-dom";
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

const userStories = [
  "The Dark Forest",
  "City of Dreams",
  "Whispers of the Past",
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white border-r shadow-sm p-4 flex flex-col justify-between">
      <div>
        {/* Logo clicable */}
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

        {/* Sección de herramientas */}
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

        {/* Sección de historias */}
        <div className="border-t mt-4 pt-4">
          <h2 className="text-xs uppercase text-gray-400 px-2 mb-2">
            Tus historias
          </h2>
          <nav className="flex flex-col gap-1 text-sm">
            {userStories.map((story, i) => (
              <NavLink key={i} to={`/story/${i}`} className="nav-link">
                <BookOpen className="icon" />
                {story}
              </NavLink>
            ))}
            <NavLink
              to="/new-story"
              className="nav-link text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="icon" />
              New Story
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
}
