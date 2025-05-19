"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, User, ArrowRight } from "lucide-react"

import API from "@/services/api"

import { Button } from "@/components/ui/button/ButtonAuth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function AuthForm() {
  const [registro, setRegistro] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")

  const [showResetModal, setShowResetModal] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMsg, setResetMsg] = useState("")
  const [resetError, setResetError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("❌ Todos los campos son obligatorios.")
      return
    }
    if (!email.includes("@")) {
      alert("❌ El correo electrónico no es válido.")
      return
    }
    if (password.length < 6) {
      alert("❌ La contraseña debe tener al menos 6 caracteres.")
      return
    }
    if (registro && !nombre.trim()) {
      alert("❌ El nombre es obligatorio para registrarse.")
      return
    }

    try {
      const endpoint = registro ? "/usuarios/registro" : "/usuarios/login"
      const payload = registro
        ? { email, password, nombre }
        : { email, password }

      const res = await API.post(endpoint, payload)
      const { token } = res.data

      if (token) {
        localStorage.setItem("token", token)

        if (registro) {
          setRegistro(false)
          alert("✅ Cuenta creada correctamente. Ahora inicia sesión.")
        } else {
          navigate("/Inicio")
        }
      } else {
        alert("❌ No se recibió un token del servidor.")
      }
    } catch (error) {
      console.error("Error en la autenticación:", error)
      const msg = error.response?.data?.message || "Error inesperado"
      alert("🚫 " + msg)
    }
  }

  const handleResetPassword = async () => {
    setResetMsg("")
    setResetError("")

    if (!resetEmail || !resetEmail.includes("@")) {
      setResetError("Ingresa un correo válido")
      return
    }

    try {
      await API.post("/usuarios/reset-password", { email: resetEmail })
      setResetMsg("✅ Se ha enviado un email con instrucciones para restablecer tu contraseña.")
    } catch (err) {
      setResetError("❌ Error al enviar el email. Intenta más tarde.")
    }
  }

  return (
    <div className="w-full max-w-md relative mx-auto">
      <Card className="bg-white shadow-sm border border-gray-100 rounded-lg">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex justify-center">
            <img src="/logo.png" alt="Lore Weaver" width={180} height={180} className="object-contain" />
          </div>
          <CardTitle className="text-2xl font-medium text-gray-800">
            {registro ? "Crear cuenta" : "¡Crea tus historias de una forma diferente!"}
          </CardTitle>
          <CardDescription className="text-gray-500 font-normal">
            {registro ? "Crea una cuenta para comenzar" : "Inicia sesión con tu cuenta"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-6">
          {registro && (
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm text-gray-700">
                Nombre completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="nombre"
                  placeholder="Tu nombre completo"
                  className="pl-10 bg-white text-gray-800 border border-gray-200 placeholder-gray-400 h-9 rounded-md focus-visible:ring-gray-300 focus-visible:ring-offset-0"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-700">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="pl-10 bg-white text-gray-800 border border-gray-200 placeholder-gray-400 h-9 rounded-md focus-visible:ring-gray-300 focus-visible:ring-offset-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-gray-700">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 bg-white text-gray-800 border border-gray-200 placeholder-gray-400 h-9 rounded-md focus-visible:ring-gray-300 focus-visible:ring-offset-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#2381fe] hover:bg-[#0b6edf] text-white font-medium h-9 rounded-md transition-colors"
          >
            <span>{registro ? "Crear cuenta" : "Iniciar sesión"}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {!registro && (
            <button
              onClick={() => setShowResetModal(true)}
              className="text-sm text-white-500 transition-colors"
              type="button"
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}

          <button
            className="text-sm text-gray-100 transition-colors"
            onClick={() => setRegistro(!registro)}
          >
            {registro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </CardFooter>
      </Card>

      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96 max-w-full relative">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-900"
              aria-label="Cerrar"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Recuperar contraseña</h2>
            <p className="mb-4 text-sm text-gray-700">
              Introduce tu correo electrónico para recibir un enlace de restablecimiento.
            </p>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="tu@ejemplo.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            {resetMsg && <p className="text-green-600 mb-2">{resetMsg}</p>}
            {resetError && <p className="text-red-600 mb-2">{resetError}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Enviar enlace
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} Lore Weaver. Todos los derechos reservados.
      </p>
    </div>
  )
}
