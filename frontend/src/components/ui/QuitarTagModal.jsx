import { useState } from "react";
import API from "@/services/api";

export default function QuitarTagModal({ personajeId, tagsAsignados = [], onClose, onSuccess }) {
  const [tagSeleccionado, setTagSeleccionado] = useState(
    tagsAsignados.length > 0 ? tagsAsignados[0].id_Tag.toString() : ""
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuitar = async () => {
    if (!tagSeleccionado) return;

    setLoading(true);
    setError("");

    try {
      await API.delete(`/personajes/${personajeId}/quitar-tag`, {
        tagId: parseInt(tagSeleccionado),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("❌ Error al quitar tag:", err);
      setError("No se pudo quitar el tag. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Quitar tag del personaje</h2>

        {/* Botón para cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {tagsAsignados.length === 0 ? (
          <p className="text-sm text-neutral-500 italic">Este personaje no tiene tags asignados.</p>
        ) : (
          <>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <select
              value={tagSeleccionado}
              onChange={(e) => setTagSeleccionado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-6"
            >
              {tagsAsignados.map((tag) => (
                <option key={tag.id_Tag} value={tag.id_Tag}>
                  {tag.nombre_tag}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleQuitar}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Quitando..." : "Quitar tag"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
