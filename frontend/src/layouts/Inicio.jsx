import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function Inicio() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`flex-1 overflow-auto bg-gray-100 transition-all duration-300
          ${sidebarOpen ? "translate-x-64 md:translate-x-0" : ""}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
