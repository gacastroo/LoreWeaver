import { useEffect, useState } from 'react'
import API from '../services/api'
import PersonajeForm from '../components/PersonajeForm'

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState([])

  const cargar = () => {
    API.get('/personajes')
      .then(res => setPersonajes(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    cargar()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Personajes</h1>
      <PersonajeForm onRefresh={cargar} />
      <div className="mt-6">
        {personajes.map(p => (
          <div key={p.id_Personaje} className="p-3 border-b">
            <strong>{p.nombre_personaje}</strong> — {p.descripcion_personaje}
          </div>
        ))}
      </div>
    </div>
  )
}
