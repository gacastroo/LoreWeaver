import { useEffect, useState } from "react";
import API from "@/services/api";
import SummaryCard from "@/components/dashboard/SummaryCard";
import QuickStats from "@/components/dashboard/QuickStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RecentStories from "@/components/dashboard/RecentStories";

// Mock en caso de fallo en la API
const mockData = {
  stories: 3,
  characters: 24,
  chapters: 12,
  universes: 2,
  scenes: 36,
  tags: 18,
  words: 24568,
  recentStories: [
    { title: "La Sombra del Norte", genre: "Fantasía", updated: "hace 1 día" },
    { title: "Líneas del Destino", genre: "Sci-Fi", updated: "hace 3 días" }
  ],
  activity: [
    { text: "Nuevo personaje creado: Elion", time: "Hace 2 horas" },
    { text: "Capítulo finalizado: El Despertar", time: "Hace 5 horas" }
  ]
};

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Error al cargar dashboard:", err);
        setData(mockData); // fallback
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-8 bg-neutral-100 space-y-8">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Stories" value={data.stories} />
        <SummaryCard title="Characters" value={data.characters} />
        <SummaryCard title="Chapters" value={data.chapters} />
        <SummaryCard title="Universes" value={data.universes} />
      </div>

      {/* Actividad y estadísticas solo si hay datos */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.activity?.length > 0 ? (
          <RecentActivity activity={data.activity} />
        ) : (
          <div className="p-4 bg-white rounded border text-sm text-neutral-400">
            Sin actividad reciente.
          </div>
        )}

        {(data.scenes > 0 || data.tags > 0 || data.words > 0) ? (
          <QuickStats stats={data} />
        ) : (
          <div className="p-4 bg-white rounded border text-sm text-neutral-400">
            No hay estadísticas disponibles aún.
          </div>
        )}
      </div>

      {/* Historias recientes */}
      <RecentStories stories={data.recentStories} />
    </div>
  );
}
