import { useState } from "react";
import API from "@/services/api";

export default function CreateTagModal({ onClose, onSuccess, endpoint, historiaId }) {
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!titulo.trim()) return;

    const data = {
      nombre_tag: titulo,
    };

    if (historiaId) {
      data.historiaId = parseInt(historiaId);
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await API.post(endpoint, data);
      onSuccess(res.data);
      onClose();
    } catch (error) {
      console.error("❌ Error al crear tag:", error);
      setErrorMessage("Error al crear el tag. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Nueva tag</h2>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            <strong>{errorMessage}</strong>
          </div>
        )}

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del tag"
          className="w-full p-2 mb-6 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!titulo.trim() || loading}
            className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
