import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import DashboardLayout from './layouts/DashboardLayout'
import PersonajesPage from './pages/PersonajesPage'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="personajes" element={<PersonajesPage />} />
            {/* Agrega más secciones protegidas aquí */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
