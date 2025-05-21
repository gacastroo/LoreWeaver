import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "@/services/api"
import jsPDF from "jspdf"

export default function EditorHistoria({ onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [historia, setHistoria] = useState(null)
  const [titulo, setTitulo] = useState("")
  const [contenido, setContenido] = useState("")
  const [loading, setLoading] = useState(true)
  const textareaRef = useRef(null)

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const res = await API.get(`/api/historias/${id}`)
        setHistoria(res.data)
        setTitulo(res.data.titulo || "")
        setContenido(res.data.contenido || "")
        ajustarAlturaTextarea(res.data.contenido || "")
      } catch (error) {
        console.error("❌ Error al cargar historia:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistoria()
  }, [id])

  const ajustarAlturaTextarea = (value) => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = "auto"
      ta.style.height = ta.scrollHeight + "px"
    }
  }

  const handleContenidoChange = (e) => {
    setContenido(e.target.value)
    ajustarAlturaTextarea(e.target.value)
  }

  const handleGuardar = async () => {
    try {
      const res = await API.put(`/api/historias/${id}`, {
        titulo,
        contenido,
      })

      alert("✅ Historia actualizada correctamente")
      onUpdate && onUpdate(res.data)
      navigate("/stories")
    } catch (error) {
      console.error("❌ Error al actualizar historia:", error)
    }
  }

  const handleExportarPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text(`Título: ${titulo}`, 10, 20)

    doc.setFontSize(12)
    const lineas = doc.splitTextToSize(contenido, 180)
    doc.text(lineas, 10, 30)

    doc.save(`historia_${titulo || "sin_titulo"}.pdf`)
  }

  if (loading) return <p className="p-6 text-neutral-700">Cargando historia...</p>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-neutral-700">✍️ Editar Historia</h1>

      <label className="block mb-2 text-sm font-medium text-neutral-700">Título</label>
      <input
        type="text"
        className="w-full p-3 border border-neutral-400 text-lg font-semibold rounded-md mb-4"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la historia"
      />

      <label className="block mb-2 text-sm font-medium text-neutral-700">Contenido</label>
      <textarea
        ref={textareaRef}
        className="w-full p-4 border border-neutral-400 text-neutral-800 rounded-md bg-white resize-none"
        value={contenido}
        onChange={handleContenidoChange}
        placeholder="Escribe el contenido de la historia..."
        style={{ minHeight: "150px", overflow: "hidden" }}
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={handleGuardar}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Guardar cambios
        </button>

        <button
          onClick={handleExportarPDF}
          className="ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Exportar PDF
        </button>
      </div>
    </div>
  )
}
