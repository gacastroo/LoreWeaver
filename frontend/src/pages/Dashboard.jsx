// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "@/services/api";
import SummaryCard from "@/components/dashboard/SummaryCard";
import RecentStories from "@/components/dashboard/RecentStories";
import QuickStats from "@/components/dashboard/QuickStats";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Error al cargar dashboard", err);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <p className="p-8 text-neutral-500">Cargando...</p>;

  return (
    <div className="p-8 bg-neutral-100 min-h-screen space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Stories" value={data.stories} />
        <SummaryCard title="Characters" value={data.characters} />
        <SummaryCard title="Chapters" value={data.chapters} />
        <SummaryCard title="Universes" value={data.universes} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <RecentActivity activity={data.activity} />
        <QuickStats stats={data} />
        <RecentStories stories={data.recentStories} />
      </div>

    </div>
  );
}


