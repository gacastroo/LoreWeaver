import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";
import SummaryCard from "@/components/dashboard/SummaryCard";
import QuickStats from "@/components/dashboard/QuickStats";
import RecentStories from "@/components/dashboard/RecentStories";
import { useApp } from "@/context/AppContext";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme, t } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("❌ Error al cargar dashboard:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <p className={`p-6 ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.cargando}</p>
  );
  if (!data) return (
    <p className="p-6 text-red-500">{t.errorDashboard}</p>
  );

  if (data.stories === 0 && data.characters === 0 && data.universes === 0) {
    return (
      <div className={`p-8 flex justify-center items-center min-h-[60vh] ${isLight ? "bg-neutral-100" : "bg-zinc-950"}`}>
        <div className={`p-6 rounded-lg shadow-md border max-w-md w-full text-center space-y-5 ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
          <img src="/logo.png" alt="Sin contenido" className={`w-24 h-24 mx-auto opacity-80 ${isLight ? "" : "invert"}`} />
          <h2 className={`text-xl font-semibold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>
            {t.dashboardVacio}
          </h2>
          <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>
            {t.dashboardVacioDesc}
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <button onClick={() => navigate("/stories")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition">
              {t.nuevaHistoria}
            </button>
            <button onClick={() => navigate("/characters")} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm transition">
              {t.nuevoPersonaje}
            </button>
            <button onClick={() => navigate("/universes")} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition">
              {t.nuevoUniverso}
            </button>
            <button onClick={() => navigate("/guia")} className="bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-md text-sm transition">
              {t.guiaInicio}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-8 space-y-8 ${isLight ? "bg-neutral-100" : "bg-zinc-950"}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title={t.historias} value={data.stories} />
        <SummaryCard title={t.personajes} value={data.characters} />
        <SummaryCard title={t.universos} value={data.universes} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {(data.scenes > 0 || data.tags > 0) ? (
          <QuickStats stats={data} />
        ) : (
          <div className={`p-4 rounded border text-sm ${isLight ? "bg-white border-neutral-200 text-neutral-400" : "bg-zinc-800 border-zinc-700 text-zinc-500"}`}>
            {t.noEstadisticas}
          </div>
        )}
      </div>

      {data.recentStories?.length > 0 ? (
        <RecentStories stories={data.recentStories} />
      ) : (
        <div className={`p-4 rounded border text-sm ${isLight ? "bg-white border-neutral-200 text-neutral-400" : "bg-zinc-800 border-zinc-700 text-zinc-500"}`}>
          {t.noHistoriasRecientes}
        </div>
      )}
    </div>
  );
}
