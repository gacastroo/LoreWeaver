import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "@/services/api"

export default function EditorPersonaje({ onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [personaje, setPersonaje] = useState(null)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPersonaje = async () => {
      console.log("Valor de id:", id);
      try {
        const res = await API.get(`/personajes/${id}`)
        setPersonaje(res.data)
        setNombre(res.data.nombre_personaje || "")
        setDescripcion(res.data.descripcion_personaje || "")
      } catch (error) {
        console.error("❌ Error al cargar personaje:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPersonaje()
  }, [id])

  const handleGuardar = async () => {
    try {
      const res = await API.put(`/personajes/${id}`, {
        nombre_personaje: nombre,
        descripcion_personaje: descripcion
      })

      alert("✅ Personaje actualizado correctamente")
      onUpdate && onUpdate(res.data)
      navigate("/universes")
    } catch (error) {
      console.error("❌ Error al actualizar personaje:", error)
    }
  }

  if (loading) return <p className="p-6">Cargando personaje...</p>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-neutral-700">
        ✍️ Editar Personaje
      </h1>

      <label className="block mb-2 text-sm font-medium text-neutral-700">
        Nombre
      </label>
      <input
        type="text"
        className="w-full p-3 border border-neutral-400 text-lg font-semibold rounded-md mb-4"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del personaje"
      />

      <label className="block mb-2 text-sm font-medium text-neutral-700">
        Descripción
      </label>
      <textarea
        className="w-full p-4 border border-neutral-400 text-neutral-800 rounded-md min-h-[150px] bg-white"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Escribe la descripción del personaje..."
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
