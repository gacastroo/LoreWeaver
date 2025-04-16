import { useState, useEffect } from 'react'
import API from '../services/api'
import TagSelector from './TagSelector'

export default function PersonajeForm({ onRefresh }) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [historiaId, setHistoriaId] = useState(1) // ajustable
  const [tagIds, setTagIds] = useState([])

  const crearPersonaje = async () => {
    try {
      const res = await API.post('/personajes', {
        nombre_personaje: nombre,
        descripcion_personaje: descripcion,
        historiaId
      })
      const personaje = res.data

      // Asignar tags seleccionados
      for (let tagId of tagIds) {
        await API.post('/tags/asignar', {
          personajeId: personaje.id_Personaje,
          tagId
        })
      }

      setNombre('')
      setDescripcion('')
      setTagIds([])
      onRefresh()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-4 border rounded shadow space-y-2">
      <h2 className="text-lg font-bold">Crear personaje</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border px-2 py-1 w-full"
      />
      <TagSelector selected={tagIds} setSelected={setTagIds} />
      <button onClick={crearPersonaje} className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </div>
  )
}
