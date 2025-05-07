import { useEffect, useState } from "react";
import API from "@/services/api";
import UniverseForm from "@/components/universe/UniverseForm";
import AddButton from "@/components/ui/button/AddButton";
import UniverseCard from "@/components/universe/UniverseCard";

export default function Universes() {
  const [universos, setUniversos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [historias, setHistorias] = useState([]);

  // 🔄 Cargar universos
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

  // 🔄 Cargar historias (para mostrar nombre en las tarjetas)
  const fetchHistorias = async () => {
    try {
      const res = await API.get("/historias");
      setHistorias(res.data);
    } catch (error) {
      console.error("❌ Error al obtener historias:", error);
    }
  };

  useEffect(() => {
    fetchUniversos();
    fetchHistorias();
  }, []);

  const handleAgregarUniverso = () => {
    setMostrarModal(true);
  };

  const handleUniversoCreado = async () => {
    await fetchUniversos();
    setMostrarModal(false);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  const handleEliminarUniverso = async (id) => {
    try {
      await API.delete(`/universos/${id}`);
      setUniversos((prev) => prev.filter((u) => u.id_Universo !== id));
    } catch (error) {
      console.error("❌ Error al eliminar universo:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-100 px-8 py-6 overflow-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-700">Universos</h1>
        <AddButton onClick={handleAgregarUniverso} label="Nuevo universo" />
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Cargando universos...</p>
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
        <p className="text-sm text-neutral-500">No hay universos creados todavía.</p>
      )}

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 max-w-xl w-full relative shadow-lg">
            <button
              onClick={handleCerrarModal}
              className="absolute top-3 right-4 text-xl text-zinc-400 hover:text-red-500"
            >
              ✖
            </button>
            <UniverseForm onUniverseCreated={handleUniversoCreado} />
          </div>
        </div>
      )}
    </div>
  );
}
