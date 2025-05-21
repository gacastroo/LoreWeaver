import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";
import ChapterCard from "@/components/chapter/ChapterCard";
import ChapterForm from "@/components/chapter/ChapterForm";

export default function Chapters() {
  const [capitulos, setCapitulos] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const fetchData = async () => {
    try {
      const [capRes, hisRes] = await Promise.all([
        API.get("/capitulos"),
        API.get("/historias"),
      ]);
      setCapitulos(capRes.data);
      setHistorias(hisRes.data);
    } catch (err) {
      console.error("❌ Error al cargar capítulos o historias:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/capitulos/${id}`);
      setCapitulos((prev) => prev.filter((c) => c.id_Capitulo !== id));
    } catch (error) {
      console.error("❌ Error al eliminar capítulo:", error);
    }
  };

  const handleAdd = () => {
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  const handleCapituloCreado = async () => {
    await fetchData();
    setMostrarModal(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Capítulos</h1>
        <AddButton onClick={handleAdd} label="Nuevo capítulo" />
      </div>

      {capitulos.length === 0 ? (
        <p className="text-sm text-neutral-500">No hay capítulos creados todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capitulos.map((cap) => {
            const historia = historias.find((h) => h.id === cap.historiaId);
            return (
              <ChapterCard
                key={cap.id_Capitulo}
                chapter={cap}
                historia={historia}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
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
            <ChapterForm onChapterCreated={handleCapituloCreado} />
          </div>
        </div>
      )}
    </div>
  );
}
