import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, User, ArrowRight } from "lucide-react"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"

export default function AuthForm() {
  const [registro, setRegistro] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      localStorage.setItem("token", "token-simulado")
      navigate("/dashboard/personajes")
    } catch {
      alert("Error al iniciar sesión o registrarse")
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card className="bg-white shadow-md border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="Lore Weaver"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {registro ? "Crear cuenta" : "¡Bienvenido de nuevo!"}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {registro ? "Crea una cuenta para comenzar" : "Inicia sesión con tu cuenta"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {registro && (
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="nombre"
                  placeholder="Tu nombre completo"
                  className="pl-10"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              {!registro && (
                <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
                  ¿Olvidaste tu contraseña?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            <span>{registro ? "Crear cuenta" : "Iniciar sesión"}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <button
            className="text-sm text-gray-600 hover:text-black"
            onClick={() => setRegistro(!registro)}
          >
            {registro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </CardFooter>
      </Card>

      <p className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Lore Weaver. Todos los derechos reservados.
      </p>
    </div>
  )
}
