import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";
import SceneCard from "@/components/scene/SceneCard";
import SceneForm from "@/components/scene/SceneForm";
import { useApp } from "@/context/AppContext";

export default function Scenes() {
  const [escenas, setEscenas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const fetchEscenas = async () => {
    try {
      const res = await API.get("/escenas");
      setEscenas(res.data);
    } catch (error) {
      console.error("❌ Error al cargar escenas:", error);
    }
  };

  useEffect(() => { fetchEscenas(); }, []);

  return (
    <div className={`p-8 min-h-full ${isLight ? "bg-white" : "bg-zinc-950"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>{t.tituloEscenas}</h1>
        <AddButton onClick={() => setMostrarModal(true)} label={t.nuevaEscenaBtn} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {escenas.length === 0 ? (
          <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.noEscenas}</p>
        ) : (
          escenas.map((escena) => (
            <SceneCard
              key={escena.id_Escena}
              escena={escena}
              onDelete={async (id) => {
                try {
                  await API.delete(`/escenas/${id}`);
                  setEscenas((prev) => prev.filter((e) => e.id_Escena !== id));
                } catch (error) {
                  console.error("❌ Error al eliminar escena:", error);
                }
              }}
            />
          ))
        )}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`rounded-2xl p-6 max-w-xl w-full relative shadow-lg ${isLight ? "bg-white" : "bg-zinc-800"}`}>
            <button onClick={() => setMostrarModal(false)} className="absolute top-3 right-4 text-xl text-zinc-400 hover:text-red-500">✖</button>
            <SceneForm onSceneCreated={async () => { await fetchEscenas(); setMostrarModal(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}
