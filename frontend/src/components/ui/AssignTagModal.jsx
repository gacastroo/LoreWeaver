"use client"

import { useEffect, useState } from "react"
import API from "@/services/api"
import { toast } from "react-hot-toast";


export default function AssignTagModal({ personajeId, onClose, onSuccess, tagsAsignados = [] }) {
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState("")

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await API.get("/api/tags")
        const tagsDisponibles = res.data.filter(
          (tag) => !tagsAsignados.some((t) => t.id_Tag === tag.id_Tag)
        )
        setTags(tagsDisponibles)
      } catch (error) {
        console.error("❌ Error al cargar tags:", error)
      }
    }
    fetchTags()
  }, [tagsAsignados])

  const handleAssign = async () => {
    try {
      await API.post("/api/personajes/agregar-tag", {
        personajeId,
        tagId: selectedTag,
      })
      toast.success("Etiqueta asignada correctamente ✅")
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error al asignar la etiqueta ❌")
    }
  }
  

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-neutral-200">
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Asignar etiqueta</h2>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full p-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 mb-6"
        >
          <option value="">Selecciona una etiqueta</option>
          {tags.map((tag) => (
            <option key={tag.id_Tag} value={tag.id_Tag}>
              {tag.nombre_tag}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-neutral-600 border border-neutral-600 rounded-md hover:bg-neutral-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedTag}
            className={`px-4 py-2 text-sm rounded-md transition ${
              selectedTag
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
            }`}
          >
            Asignar
          </button>
        </div>
      </div>
    </div>
  )
}
