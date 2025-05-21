import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "@/services/api"

export default function EditorPersonaje({ onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [personaje, setPersonaje] = useState(null)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [loading, setLoading] = useState(true)
  const textareaRef = useRef(null)

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        const res = await API.get(`/personajes/${id}`)
        setPersonaje(res.data)
        setNombre(res.data.nombre_personaje || "")
        setDescripcion(res.data.descripcion_personaje || "")
        ajustarAlturaTextarea(res.data.descripcion_personaje || "")
      } catch (error) {
        console.error("❌ Error al cargar personaje:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPersonaje()
  }, [id])

  // Función para ajustar altura del textarea automáticamente
  const ajustarAlturaTextarea = (value) => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = "auto"
      ta.style.height = ta.scrollHeight + "px"
    }
  }

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value)
    ajustarAlturaTextarea(e.target.value)
  }

  const handleGuardar = async () => {
    try {
      const res = await API.put(`/personajes/${id}`, {
        nombre_personaje: nombre,
        descripcion_personaje: descripcion,
      })

      alert("✅ Personaje actualizado correctamente")
      onUpdate && onUpdate(res.data)
      navigate("/universes")
    } catch (error) {
      console.error("❌ Error al actualizar personaje:", error)
    }
  }

  if (loading) return <p className="p-6 text-neutral-700">Cargando personaje...</p>

  return (
    <div className="p-8 max-w-4xl mx-auto"> {/* Aumentado max-w-4xl para mayor ancho */}
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
        ref={textareaRef}
        className="w-full p-4 border border-neutral-400 text-neutral-800 rounded-md bg-white resize-none"
        value={descripcion}
        onChange={handleDescripcionChange}
        placeholder="Escribe la descripción del personaje..."
        style={{ minHeight: "150px", overflow: "hidden" }}
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
