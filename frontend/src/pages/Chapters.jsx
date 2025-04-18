import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";
import ChapterCard from "@/components/chapter/ChapterCard";

export default function Chapters() {
  const [capitulos, setCapitulos] = useState([]);
  const [historias, setHistorias] = useState([]);

  const fetchData = async () => {
    try {
      const [capRes, hisRes] = await Promise.all([
        API.get("/capitulos"),
        API.get("/historias")
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
      setCapitulos(prev => prev.filter(c => c.id_Capitulo !== id));
    } catch (error) {
      console.error("❌ Error al eliminar capítulo:", error);
    }
  };

  const handleAdd = () => {
    console.log("📝 Abrir modal para nuevo capítulo");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Capítulos</h1>
        <AddButton onClick={handleAdd} label="Nuevo capítulo" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {capitulos.map((cap) => {
          const historia = historias.find(h => h.id === cap.historiaId);
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
    </div>
  );
}
