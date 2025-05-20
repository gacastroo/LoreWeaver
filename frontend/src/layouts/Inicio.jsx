// src/layouts/Inicio.jsx
import Sidebar from "@/components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
