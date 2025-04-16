// src/layouts/DashboardLayout.jsx
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
