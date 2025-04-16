import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">LoreWeaver</h2>
      <Link to="/dashboard/personajes" className="hover:bg-gray-700 px-2 py-1 rounded">🧍 Personajes</Link>
      <Link to="/dashboard/historias" className="hover:bg-gray-700 px-2 py-1 rounded">📖 Historias</Link>
      <Link to="/dashboard/escenas" className="hover:bg-gray-700 px-2 py-1 rounded">🎬 Escenas</Link>
      <Link to="/dashboard/capitulos" className="hover:bg-gray-700 px-2 py-1 rounded">📄 Capítulos</Link>
      <Link to="/dashboard/universos" className="hover:bg-gray-700 px-2 py-1 rounded">🌌 Universos</Link>
      <Link to="/dashboard/tags" className="hover:bg-gray-700 px-2 py-1 rounded">🏷️ Etiquetas</Link>

      <button onClick={logout} className="mt-auto bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
        Cerrar sesión
      </button>
    </div>
  )
}
