import { useEffect, useState } from "react";
import StoryCard from "@/components/story/StoryCard";
import AddButton from "@/components/ui/button/AddButton";
import API from "@/services/api"; // Axios configurado con token

export default function Historias() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/historias"); // token incluido automáticamente
        setHistorias(res.data);
      } catch (error) {
        console.error("❌ Error al cargar historias:", error);
        // Puedes manejar redirección al login si error.response.status === 401
      } finally {
        setLoading(false);
      }
    };

    fetchHistorias();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await API.delete(`/historias/${id}`);
      setHistorias(prev => prev.filter(h => h.id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar historia:", error);
    }
  };

  const handleAdd = () => {
    console.log("📌 Abrir modal para nueva historia");
  };

  if (loading) {
    return <p className="p-6 text-neutral-500">Cargando historias...</p>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Historias</h1>
        <AddButton onClick={handleAdd} label="Nueva historia" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {historias.length > 0 ? (
          historias.map((story) => (
            <StoryCard key={story.id} story={story} onDelete={handleEliminar} />
          ))
        ) : (
          <p className="text-sm text-neutral-500">No hay historias registradas aún.</p>
        )}
      </div>
    </div>
  );
}
