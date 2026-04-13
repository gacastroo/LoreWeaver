import { useEffect, useState } from "react"
import StoryCard from "@/components/story/StoryCard"
import AddButton from "@/components/ui/button/AddButton"
import API from "@/services/api"
import CreateStoryModal from "@/components/ui/CreateStoryModal"
import { useApp } from "@/context/AppContext"

export default function Historias() {
  const [historias, setHistorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { theme, t } = useApp()
  const isLight = theme === "light"

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/historias")
        setHistorias(res.data)
      } catch (error) {
        console.error("❌ Error al cargar historias:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistorias()
  }, [])

  const handleEliminar = async (id) => {
    try {
      await API.delete(`/historias/${id}`)
      setHistorias(prev => prev.filter(h => h.id !== id))
    } catch (error) {
      console.error("❌ Error al eliminar historia:", error)
    }
  }

  if (loading) {
    return <p className={`p-6 ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.cargandoHistorias}</p>
  }

  return (
    <div className={`p-8 min-h-full ${isLight ? "bg-white" : "bg-zinc-950"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>{t.tituloHistorias}</h1>
        <AddButton onClick={() => setShowModal(true)} label={t.nuevaHistoriaBtn} />
      </div>

      {showModal && (
        <CreateStoryModal
          onClose={() => setShowModal(false)}
          onSuccess={(nueva) => setHistorias(prev => [nueva, ...prev])}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {historias.length > 0 ? (
          historias.map((story) => (
            <StoryCard key={story.id} story={story} onDelete={handleEliminar} />
          ))
        ) : (
          <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.noHistorias}</p>
        )}
      </div>
    </div>
  )
}
