import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "@/layouts/Inicio";
import Characters from "@/pages/Characters";
import LogoScreen from "@/pages/LogoScreen";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sin sidebar */}
        <Route path="/" element={<LoginRegister />} />

        {/* Con sidebar (rutas protegidas) */}
        <Route
          element={
              <Inicio />
          }
        >
          <Route path="/inicio" element={<LogoScreen />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
