// src/pages/Scenes.jsx
import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";
import SceneCard from "@/components/scene/SceneCard";

export default function Scenes() {
  const [escenas, setEscenas] = useState([]);

  const fetchEscenas = async () => {
    try {
      const res = await API.get("/escenas");
      setEscenas(res.data);
    } catch (error) {
      console.error("❌ Error al cargar escenas:", error);
    }
  };

  useEffect(() => {
    fetchEscenas();
  }, []);

  const handleAdd = () => {
    console.log("📝 Abrir modal para crear nueva escena");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Escenas</h1>
        <AddButton onClick={handleAdd} label="Nueva escena" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {escenas.length === 0 ? (
          <p className="text-neutral-500">No hay escenas registradas.</p>
        ) : (
            escenas.map((escena) => (
                <SceneCard
                  key={escena.id_Escena}
                  escena={escena}
                  onDelete={async (id) => {
                    try {
                      await API.delete(`/escenas/${id}`);
                      setEscenas((prev) => prev.filter((e) => e.id_Escena !== id));
                      console.log("✅ Escena eliminada:", id);
                    } catch (error) {
                      console.error("❌ Error al eliminar escena:", error);
                    }
                  }}
                />
              ))
              
        )}
      </div>
    </div>
  );
}
