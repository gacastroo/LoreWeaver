import { useEffect, useState } from "react";
import API from "@/services/api";
import UniverseForm from "@/components/universe/UniverseForm";
import AddButton from "@/components/ui/button/AddButton";
import UniverseCard from "@/components/universe/UniverseCard";
import { useApp } from "@/context/AppContext";

export default function Universes() {
  const [universos, setUniversos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [historias, setHistorias] = useState([]);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const fetchUniversos = async () => {
    setLoading(true);
    try {
      const res = await API.get("/universos");
      setUniversos(res.data);
    } catch (error) {
      console.error("❌ Error al obtener universos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistorias = async () => {
    try {
      const res = await API.get("/historias");
      setHistorias(res.data);
    } catch (error) {
      console.error("❌ Error al obtener historias:", error);
    }
  };

  useEffect(() => { fetchUniversos(); fetchHistorias(); }, []);

  const handleEliminarUniverso = async (id) => {
    try {
      await API.delete(`/universos/${id}`);
      setUniversos((prev) => prev.filter((u) => u.id_Universo !== id));
    } catch (error) {
      console.error("❌ Error al eliminar universo:", error);
    }
  };

  return (
    <div className={`flex flex-col h-full w-full px-8 py-6 overflow-auto space-y-4 ${isLight ? "bg-neutral-100" : "bg-zinc-950"}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-semibold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>{t.tituloUniversos}</h1>
        <AddButton onClick={() => setMostrarModal(true)} label={t.nuevoUniversoBtn} />
      </div>

      {loading ? (
        <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.cargandoUniversos}</p>
      ) : universos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universos.map((u) => (
            <UniverseCard
              key={u.id_Universo}
              universo={u}
              historias={historias}
              onDelete={handleEliminarUniverso}
            />
          ))}
        </div>
      ) : (
        <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.noUniversos}</p>
      )}

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`rounded-2xl p-6 max-w-xl w-full relative shadow-lg ${isLight ? "bg-white" : "bg-zinc-800"}`}>
            <button onClick={() => setMostrarModal(false)} className="absolute top-3 right-4 text-xl text-zinc-400 hover:text-red-500">✖</button>
            <UniverseForm onUniverseCreated={async () => { await fetchUniversos(); setMostrarModal(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}
