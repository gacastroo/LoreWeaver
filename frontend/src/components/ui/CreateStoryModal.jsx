
import { useState } from "react"
import API from "@/services/api"
import AccessibleModal from "@/components/ui/AccessibleModal"

export default function CreateStoryModal({ onClose, onSuccess }) {
  const [titulo, setTitulo] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!titulo.trim()) return;

    setLoading(true)
    try {

      const historiaRes = await API.post("/historias", { titulo })
      const historia = historiaRes.data

      await API.post("/capitulos", {
        titulo_capitulo: "Capítulo 1",
        historiaId: historia.id
      })

      onSuccess(historia)
      onClose()
    } catch (error) {
      console.error("❌ Error al crear historia:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AccessibleModal title="Nueva historia" onClose={onClose}>
        <label htmlFor="titulo-historia" className="sr-only">Título de la historia</label>
        <input
          id="titulo-historia"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la historia"
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
  )
}
