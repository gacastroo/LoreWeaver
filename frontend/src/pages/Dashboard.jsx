import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";
import SummaryCard from "@/components/dashboard/SummaryCard";
import QuickStats from "@/components/dashboard/QuickStats";
import RecentStories from "@/components/dashboard/RecentStories";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (data.stories === 0 && data.characters === 0 && data.universes === 0) {
  return (
    <div className="p-8 bg-neutral-100 flex justify-center items-center min-h-[60vh]">
      <div className="bg-white p-6 rounded-lg shadow-md border max-w-md w-full text-center space-y-5">
        <img
          src="/logo.png"
          alt="Sin contenido"
          className="w-24 h-24 mx-auto opacity-80"
        />
        <h2 className="text-xl font-semibold text-neutral-800">
          ¡Tu mundo creativo está vacío!
        </h2>
        <p className="text-sm text-neutral-500">
          Empieza tu viaje narrativo creando tu primera historia, personaje o universo.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <button
            onClick={() => navigate("/stories")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
          >
            ✍️ Historia
          </button>
          <button
            onClick={() => navigate("/characters")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm transition"
          >
            🧙 Personaje
          </button>
          <button
            onClick={() => navigate("/universes")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition"
          >
            🌍 Universo
          </button>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="p-8 bg-neutral-100 space-y-8">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Historias" value={data.stories} />
        <SummaryCard title="Personajes" value={data.characters} />
        <SummaryCard title="Universos" value={data.universes} />
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
