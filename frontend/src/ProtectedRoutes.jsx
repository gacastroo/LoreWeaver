import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ProtectedLayout = lazy(() => import("@/layouts/ProtectedLayout"));
const LogoScreen = lazy(() => import("@/pages/LogoScreen"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Stories = lazy(() => import("@/pages/Stories"));
const Characters = lazy(() => import("@/pages/Characters"));
const Universes = lazy(() => import("@/pages/Universes"));
const Chapters = lazy(() => import("@/pages/Chapters"));
const Scenes = lazy(() => import("@/pages/Scenes"));
const Tags = lazy(() => import("@/pages/Tags"));
const MapGenerator = lazy(() => import("@/pages/MapGenerator"));
const EditorHistoria = lazy(() => import("@/pages/EditorHistoria"));
const EditorPersonaje = lazy(() => import("@/pages/EditorPersonaje"));
const EditorUniverso = lazy(() => import("@/pages/EditorUniverso"));
const EditorCapitulo = lazy(() => import("@/pages/EditorCapitulo"));
const VistaRelaciones = lazy(() => import("@/pages/VistaRelaciones"));
const NameGenerator = lazy(() => import("@/pages/NameGenerator"));
const GeneradorIdea = lazy(() => import("@/pages/GeneradorIdea"));
const ChatNarrativo = lazy(() => import("@/pages/ChatNarrativo"));
const Guia = lazy(() => import("@/pages/Guia"));

function RouteLoader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f7f6f3] text-gray-600">
      Cargando...
    </div>
  );
}

function loadRoute(Component) {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Component />
    </Suspense>
  );
}

export default function ProtectedRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={loadRoute(ProtectedLayout)}>
          <Route path="/inicio" element={loadRoute(LogoScreen)} />
          <Route path="/dashboard" element={loadRoute(Dashboard)} />
          <Route path="/stories" element={loadRoute(Stories)} />
          <Route path="/characters" element={loadRoute(Characters)} />
          <Route path="/universes" element={loadRoute(Universes)} />
          <Route path="/chapters" element={loadRoute(Chapters)} />
          <Route path="/scenes" element={loadRoute(Scenes)} />
          <Route path="/tags" element={loadRoute(Tags)} />
          <Route path="/map-generator" element={loadRoute(MapGenerator)} />
          <Route path="/historia/:id" element={loadRoute(EditorHistoria)} />
          <Route path="/editor-capitulo/:id" element={loadRoute(EditorCapitulo)} />
          <Route path="/personaje/:id" element={loadRoute(EditorPersonaje)} />
          <Route path="/universo/:id" element={loadRoute(EditorUniverso)} />
          <Route path="/historia/:id/relaciones" element={loadRoute(VistaRelaciones)} />
          <Route path="/name-generator" element={loadRoute(NameGenerator)} />
          <Route path="/idea-generator" element={loadRoute(GeneradorIdea)} />
          <Route path="/chat" element={loadRoute(ChatNarrativo)} />
          <Route path="/guia" element={loadRoute(Guia)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
