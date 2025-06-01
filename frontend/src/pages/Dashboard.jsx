import { useEffect, useState } from "react";
import API from "@/services/api";
import SummaryCard from "@/components/dashboard/SummaryCard";
import QuickStats from "@/components/dashboard/QuickStats";
import RecentStories from "@/components/dashboard/RecentStories";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("❌ Error al cargar dashboard:", err);
        setData(null); // sin fallback
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboard();
  }, []); 


  if (loading) return <p className="p-6 text-neutral-500">Cargando...</p>;
  if (!data) return <p className="p-6 text-red-500">Error al cargar los datos del dashboard.</p>;

  return (
    <div className="p-8 bg-neutral-100 space-y-8">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Stories" value={data.stories} />
        <SummaryCard title="Characters" value={data.characters} />
        <SummaryCard title="Universes" value={data.universes} />
      </div>

      {/* Actividad y estadísticas */}
      <div className="grid md:grid-cols-3 gap-6">
        {(data.scenes > 0 || data.tags > 0) ? (
          <QuickStats stats={data} />
        ) : (
          <div className="p-4 bg-white rounded border text-sm text-neutral-400">
            No hay estadísticas disponibles aún.
          </div>
        )}
      </div>

      {/* Historias recientes */}
      {data.recentStories?.length > 0 ? (
        <RecentStories stories={data.recentStories} />
      ) : (
        <div className="p-4 bg-white rounded border text-sm text-neutral-400">
          No hay historias recientes aún.
        </div>
      )}
    </div>
  );
}
