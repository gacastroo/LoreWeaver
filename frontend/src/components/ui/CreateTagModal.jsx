import { useState } from "react";
import API from "@/services/api";
import AccessibleModal from "@/components/ui/AccessibleModal";

export default function CreateTagModal({ onClose, onSuccess, endpoint, historiaId }) {
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!titulo.trim()) return;

    const data = { nombre_tag: titulo.trim() };

    if (historiaId) {
      data.historiaId = parseInt(historiaId);
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await API.post(endpoint, data);

      // Verificación segura antes de llamar a onSuccess
      if (res.data && res.data.id_Tag) {
        onSuccess(res.data); // Agrega el nuevo tag a la lista
        onClose();           // Cierra el modal
      } else {
        throw new Error("Tag creado sin ID válido");
      }
    } catch (error) {
      console.error("❌ Error al crear tag:", error);
      setErrorMessage("Error al crear el tag. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccessibleModal title="Nueva etiqueta" onClose={onClose}>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            <strong>{errorMessage}</strong>
          </div>
        )}

        <label htmlFor="titulo-tag" className="sr-only">Título del tag</label>
        <input
          id="titulo-tag"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del tag"
          className="w-full p-2 mb-6 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!titulo.trim() || loading}
            className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
    </AccessibleModal>
  );
}
