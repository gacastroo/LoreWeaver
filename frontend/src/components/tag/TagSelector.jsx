import { useEffect, useState } from 'react'
import API from '../../services/api'

export default function TagSelector({ selected, setSelected }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    API.get('/api/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error(err))
  }, [])

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(tagId => tagId !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  return (
    <div>
      <p className="font-semibold">Etiquetas:</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag.id_Tag}
            onClick={() => toggle(tag.id_Tag)}
            className={`px-3 py-1 rounded border ${selected.includes(tag.id_Tag) ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
          >
            {tag.nombre_tag}
          </button>
        ))}
      </div>
    </div>
  )
}
