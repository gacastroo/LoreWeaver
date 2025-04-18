import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";

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
            <div
              key={escena.id_Escena}
              className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              <h2 className="font-semibold text-indigo-700 mb-1">{escena.titulo_escena}</h2>
              <p className="text-sm text-neutral-700 mb-2">
                <strong>Orden:</strong> {escena.orden_escena}
              </p>
              <p className="text-sm text-neutral-700">
                <strong>Capítulo:</strong> {escena.capitulo?.titulo_capitulo || "—"}
              </p>
              <p className="text-sm text-neutral-700">
                <strong>Historia:</strong>{" "}
                {escena.capitulo?.historia?.titulo || escena.historia?.titulo || "—"}
              </p>
              <p className="text-sm text-neutral-700">
                <strong>Universo:</strong>{" "}
                {escena.universo?.titulo_universo || "No asignado"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
