import { Routes, Route, Link, Outlet } from 'react-router-dom'
import PersonajesPage from './Characters'
// Puedes agregar más: HistoriasPage, EscenasPage, etc.

const Sidebar = () => (
  <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4 space-y-2">
    <Link to="personajes" className="hover:bg-gray-700 px-2 py-1 rounded">Personajes</Link>
    <Link to="historias" className="hover:bg-gray-700 px-2 py-1 rounded">Historias</Link>
    <Link to="escenas" className="hover:bg-gray-700 px-2 py-1 rounded">Escenas</Link>
    {/* Agrega más secciones aquí */}
  </div>
)

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        <Routes>
          <Route path="personajes" element={<PersonajesPage />} />
          {/* Más rutas internas */}
          <Route path="*" element={<p>Selecciona una sección</p>} />
        </Routes>
      </div>
    </div>
  )
}
