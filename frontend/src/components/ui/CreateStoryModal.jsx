"use client"

import { useState } from "react"
import API from "@/services/api"

export default function CreateStoryModal({ onClose, onSuccess }) {
  const [titulo, setTitulo] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!titulo.trim()) return

    setLoading(true)
    try {
      const res = await API.post("/historias", { titulo })
      onSuccess(res.data) // devuelve la nueva historia
      onClose()
    } catch (error) {
      console.error("❌ Error al crear historia:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Nueva Historia</h2>

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título de la historia"
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
  )
}
