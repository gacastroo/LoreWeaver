// src/layouts/Inicio.jsx
import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function Inicio() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`
          flex-1 overflow-auto bg-gray-100
          pt-4
          pl-16         /* espacio para botón hamburguesa en móvil */
          md:pl-64      /* espacio para sidebar fijo en desktop */
          ${sidebarOpen ? "fixed inset-0 bg-black bg-opacity-30 z-30 md:bg-transparent md:static md:inset-auto" : ""}
        `}
        onClick={() => sidebarOpen && setSidebarOpen(false)} // clic en contenido cierra sidebar en móvil
      >
        <Outlet />
      </main>
    </div>
  );
}
