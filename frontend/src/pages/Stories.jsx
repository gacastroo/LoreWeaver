import { useEffect, useState } from "react"
import StoryCard from "@/components/story/StoryCard"
import AddButton from "@/components/ui/button/AddButton"
import API from "@/services/api"
import CreateStoryModal from "@/components/ui/CreateStoryModal" // 👈 IMPORTA EL MODAL

export default function Historias() {
  const [historias, setHistorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false) // 👈 CONTROLAMOS EL MODAL

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/api/historias")
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
      await API.delete(`/api/historias/${id}`)
      setHistorias(prev => prev.filter(h => h.id !== id))
    } catch (error) {
      console.error("❌ Error al eliminar historia:", error)
    }
  }

  const handleAdd = () => {
    setShowModal(true) // 👈 ABRE EL MODAL
  }

  const handleCrearHistoria = (nuevaHistoria) => {
    setHistorias(prev => [nuevaHistoria, ...prev]) // Añade nueva historia al principio
  }

  if (loading) {
    return <p className="p-6 text-neutral-500">Cargando historias...</p>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Historias</h1>
        <AddButton onClick={handleAdd} label="Nueva historia" />
      </div>

      {showModal && (
        <CreateStoryModal
          onClose={() => setShowModal(false)}
          onSuccess={handleCrearHistoria}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {historias.length > 0 ? (
          historias.map((story) => (
            <StoryCard key={story.id} story={story} onDelete={handleEliminar} />
          ))
        ) : (
          <p className="text-sm text-neutral-500">No hay historias registradas aún.</p>
        )}
      </div>
    </div>
  )
}
