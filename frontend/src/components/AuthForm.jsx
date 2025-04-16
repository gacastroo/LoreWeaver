import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function AuthForm() {
  const [registro, setRegistro] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const endpoint = registro ? '/usuarios/registro' : '/usuarios/login'
      const payload = registro ? { email, password, nombre } : { email, password }

      const res = await API.post(endpoint, payload)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard/personajes')
    } catch {
      alert('Error al iniciar sesión o registrarse')
    }
  }

  return (
    <div className="bg-gray-700 p-8 rounded-xl shadow-lg w-[350px] space-y-4">
      <h1 className="text-2xl font-bold text-center">{registro ? 'Registro' : 'Iniciar sesión'}</h1>
      {registro && (
        <input type="text" placeholder="Nombre" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={nombre} onChange={e => setNombre(e.target.value)} />
      )}
      <input type="email" placeholder="Correo" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">{registro ? 'Registrarse' : 'Entrar'}</button>
      <button className="w-full text-sm text-blue-300 underline mt-2" onClick={() => setRegistro(!registro)}>
        {registro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  )
}
