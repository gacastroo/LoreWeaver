import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { Outlet } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function Inicio() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useApp();
  const isLight = theme === "light";

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${isLight ? "bg-gray-100" : "bg-zinc-950"}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Saltar al contenido principal
      </a>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Contenido principal"
        className={`flex-1 overflow-auto transition-all duration-300
          ${isLight ? "bg-gray-100 text-gray-900" : "bg-zinc-950 text-gray-100"}
          ${sidebarOpen ? "translate-x-64 md:translate-x-0" : ""}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
