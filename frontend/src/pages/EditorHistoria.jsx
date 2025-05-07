import RichTextEditor from "@/components/ui/RichTextEditor"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "@/services/api"

export default function EditorHistoria() {
  const { id } = useParams()
  const [titulo, setTitulo] = useState("")
  const [contenido, setContenido] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const res = await API.get(`/historias/${id}`)
        setTitulo(res.data.titulo)
        setContenido(res.data.contenido || "<p>Vacío</p>")
      } catch (err) {
        console.error("❌ Error al obtener la historia", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHistoria()
  }, [id])

  const handleGuardar = async () => {
    try {
      await API.put(`/historias/${id}`, { contenido })
      alert("✅ Historia actualizada correctamente")
    } catch (err) {
      console.error("❌ Error al guardar historia", err)
    }
  }

  if (loading) return <p className="p-6">Cargando historia...</p>

  return (
    <div className="p-8 max-w-4xl mx-auto text">
      <h1 className="text-2xl font-bold mb-4 text-neutral-800">✍️ Editar: {titulo}</h1>
      <RichTextEditor initialContent={contenido} onChange={setContenido} />
      <button
        onClick={handleGuardar}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Guardar cambios
      </button>
    </div>
  )
}
