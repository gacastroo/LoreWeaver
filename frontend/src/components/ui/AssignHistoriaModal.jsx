import { useEffect, useState } from "react";
import API from "@/services/api";

export default function AssignHistoriaModal({ tipo, id, onClose, onSuccess }) {
  const [historias, setHistorias] = useState([]);
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/historias");
        setHistorias(res.data || []);
        if (res.data.length > 0) {
          setHistoriaSeleccionada(res.data[0].id.toString());
        }
      } catch (err) {
        console.error("❌ Error al cargar historias:", err);
        setError("No se pudieron cargar las historias.");
      }
    };

    fetchHistorias();
  }, []);

  const handleAsignar = async () => {
    if (!historiaSeleccionada || !id || !tipo) {
      setError("Faltan datos para asignar.");
      return;
    }

    try {
      const endpoint = `/${tipo}s/${id}/asociar`; // /personajes/40/asociar o /universos/12/asociar
      await API.patch(endpoint, { historiaId: parseInt(historiaSeleccionada) });
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error("❌ Error asignando historia:", err);
      setError("No se pudo asignar la historia.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">
          Asignar historia a {tipo}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {historias.length === 0 ? (
          <p className="text-sm text-neutral-500 italic mb-6">
            No hay historias disponibles.
          </p>
        ) : (
          <select
            value={historiaSeleccionada}
            onChange={(e) => setHistoriaSeleccionada(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-6"
          >
            {historias.map((h) => (
              <option key={h.id} value={h.id}>
                {h.titulo}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleAsignar}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={!historiaSeleccionada}
          >
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
