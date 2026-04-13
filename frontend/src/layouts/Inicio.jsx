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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
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