import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "@/services/api"

export default function EditorUniverso({ onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [universo, setUniverso] = useState(null)
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUniverso = async () => {
      try {
        const res = await API.get(`/universos/${id}`)
        setUniverso(res.data)
        setTitulo(res.data.titulo_universo || "")
        setDescripcion(res.data.descripcion_universo || "")
      } catch (error) {
        console.error("❌ Error al cargar universo:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUniverso()
  }, [id])

  const handleGuardar = async () => {
    try {
      const res = await API.put(`/universos/${id}`, {
        titulo_universo: titulo,
        descripcion_universo: descripcion
      })

      alert("✅ Universo actualizado correctamente")
      onUpdate && onUpdate(res.data)
      navigate("/universes")
    } catch (error) {
      console.error("❌ Error al actualizar universo:", error)
    }
  }

  if (loading) return <p className="p-6">Cargando universo...</p>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-neutral-700">
        ✍️ Editar Universo
      </h1>

      <label className="block mb-2 text-sm font-medium text-neutral-700">
        Nombre
      </label>
      <input
        className="w-full p-3 border border-neutral-400 text-lg font-semibold rounded-md mb-4"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nombre del universo"
      />

      <label className="block mb-2 text-sm font-medium text-neutral-700">
        Descripción
      </label>
      <textarea
        className="w-full p-4 border border-neutral-400 text-neutral-800 rounded-md min-h-[150px] bg-white"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Escribe la descripción del universo..."
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleGuardar}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  )
}
