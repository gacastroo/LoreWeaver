import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import Characters from "@/pages/Characters";
import LogoScreen from "@/pages/LogoScreen";
import LoginRegister from "./pages/LoginRegister";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sin sidebar */}
        <Route path="/" element={<LoginRegister />} />

        {/* Con sidebar (rutas protegidas) */}
        <Route
          element={
              <DashboardLayout />
          }
        >
          <Route path="/dashboard" element={<LogoScreen />} />
          <Route path="/characters" element={<Characters />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
