import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "@/layouts/Inicio";
import Characters from "@/pages/Characters";
import LogoScreen from "@/pages/LogoScreen";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "@/pages/Dashboard";
import Stories from "@/pages/Stories";
import Universes from "@/pages/Universes";
import Chapters from "@/pages/Chapters";
import Scenes from "@/pages/Scenes";
import Tags from "@/pages/Tags";
import MapGenerator from "@/pages/MapGenerator";
import RutaPrivada from "@/components/auth/RutaPrivada";
import EditorHistoria from "@/pages/EditorHistoria";
import EditorPersonaje from "@/pages/EditorPersonaje";
import EditorUniverso from "@/pages/EditorUniverso";
import NameGenerator from "@/pages/NameGenerator";
import ResetPassword from "@/components/ResetPassword";
import GeneradorIdea from "./pages/GeneradorIdea"



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<LoginRegister />} />

        {/* Protegidas con sidebar */}
        <Route
          element={
            <RutaPrivada>
              <Inicio />
            </RutaPrivada>
          }
        >
          <Route path="/inicio" element={<LogoScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/universes" element={<Universes />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/scenes" element={<Scenes />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/map-generator" element={<MapGenerator />} />
          <Route path="/historia/:id" element={<EditorHistoria />} />
          <Route path="/personaje/:id" element={<EditorPersonaje />} />
          <Route path="/universo/:id" element={<EditorUniverso />} />
          <Route path="/name-generator" element={<NameGenerator />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/idea-generator" element={<GeneradorIdea />} />



          </Route>
          
      </Routes>
    </BrowserRouter>
  );
}
