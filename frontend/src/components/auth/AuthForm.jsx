"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button/ButtonAuth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AccessibleModal from "@/components/ui/AccessibleModal"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"


function AuthIcon({ type, className = "" }) {
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    user: <><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function LoadingOverlay({ registro }) {
  return (
    <div className="auth-loading-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="auth-loading-card">
        <div className="auth-quill-wrap">
          <svg className="auth-quill" aria-hidden="true" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M52 4C52 4 36 10 28 26C22 38 20 52 20 52C20 52 26 46 32 44C32 44 24 50 22 60C22 60 34 52 40 40C46 28 60 16 60 8L52 4Z"
              fill="#2381fe" opacity="0.15"
            />
            <path
              d="M52 4C52 4 36 10 28 26C22 38 20 52 20 52C20 52 26 46 32 44C32 44 24 50 22 60C22 60 34 52 40 40C46 28 60 16 60 8L52 4Z"
              stroke="#2381fe" strokeWidth="2" strokeLinejoin="round"
            />
            <line x1="20" y1="52" x2="8" y2="60" stroke="#2381fe" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="auth-ink-line" />
        </div>
        <p className="auth-loading-text">
          {registro ? "Creando tu cuenta…" : "Iniciando sesión…"}
        </p>
        <div className="auth-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

export default function AuthForm() {
  const [registro, setRegistro] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [loading, setLoading] = useState(false)

  const [showResetModal, setShowResetModal] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMsg, setResetMsg] = useState("")
  const [resetError, setResetError] = useState("")

  const [message, setMessage] = useState(null)

  const showMessage = (type, text) => {
    setMessage({ type, text })
    const timeout = type === "success" ? 15000 : 10000
    setTimeout(() => setMessage(null), timeout)
  }

  const handleSubmit = async () => {
    if (!email || !password) {
      showMessage("error", "❌ Todos los campos son obligatorios.")
      return
    }
    if (!email.includes("@")) {
      showMessage("error", "❌ El correo electrónico no es válido.")
      return
    }
    if (password.length < 6) {
      showMessage("error", "❌ La contraseña debe tener al menos 6 caracteres.")
      return
    }
    if (registro && !nombre.trim()) {
      showMessage("error", "❌ El nombre es obligatorio para registrarse.")
      return
    }

    setLoading(true)
    try {
      const { default: API } = await import("@/services/api")
      const endpoint = registro ? "/usuarios/registro" : "/usuarios/login"
      const payload = registro ? { email, password, nombre } : { email, password }

      const res = await API.post(endpoint, payload)
      const { token } = res.data

      if (token) {
        localStorage.setItem("token", token)

        if (registro) {
          setRegistro(false)
          showMessage("success", "✅ Cuenta creada correctamente. Ahora inicia sesión.")
        } else {
          window.location.assign("/inicio")
        }
      } else {
        showMessage("error", "❌ No se recibió un token del servidor.")
      }
    } catch (error) {
      console.error("Error en la autenticación:", error)
      const msg = error.response?.data?.message || "Error inesperado"
      showMessage("error", "🚫 " + msg)
    } finally {
      setLoading(false)
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
      const { default: API } = await import("@/services/api")
      await API.post("/usuarios/reset-password", { email: resetEmail })
      setResetMsg("✅ Se ha enviado un email con instrucciones para restablecer tu contraseña.")
    } catch (err) {
      setResetError("❌ Error al enviar el email. Intenta más tarde.")
    }
  }

  return (
    <div className="w-full max-w-md relative mx-auto">

      {loading && <LoadingOverlay registro={registro} />}

      {/* Toast message */}
      {message && (
        <div
          role="alert"
          aria-live="assertive"
          className={`
            fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded shadow-md text-sm
            ${message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"}
          `}
        >
          {message.text}
        </div>
      )}

      <Card className="bg-white shadow-sm border border-gray-100 rounded-lg">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex justify-center">
            <img
              src="/logo-512.webp"
              alt="Lore Weaver"
              width={180}
              height={180}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="object-contain"
            />
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
                <AuthIcon type="user" className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre completo"
                  className="pl-10 bg-white text-gray-800 border border-gray-200 placeholder-gray-500 h-9 rounded-md focus-visible:ring-gray-300 focus-visible:ring-offset-0"
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
              <AuthIcon type="mail" className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@ejemplo.com"
                className="pl-10 bg-white text-gray-800 border border-gray-200 placeholder-gray-500 h-9 rounded-md focus-visible:ring-gray-300 focus-visible:ring-offset-0"
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
              <AuthIcon type="lock" className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={registro ? "new-password" : "current-password"}
                placeholder="••••••••"
                className="pl-10 bg-white text-gray-800 border border-gray-200 placeholder-gray-500 h-9 rounded-md focus-visible:ring-gray-300 focus-visible:ring-offset-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#2381fe] hover:bg-[#0b6edf] text-white font-medium h-9 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>{registro ? "Crear cuenta" : "Iniciar sesión"}</span>
            <AuthIcon type="arrow" className="ml-2 h-4 w-4" />
          </Button>

          {!registro && (
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="text-sm text-blue-700 hover:text-blue-900 underline underline-offset-2 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}

          <button
            className="text-sm text-blue-700 hover:text-blue-900 underline underline-offset-2 transition-colors"
            type="button"
            onClick={() => setRegistro(!registro)}
          >
            {registro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </CardFooter>
      </Card>

      {showResetModal && (
        <AccessibleModal
          title="Recuperar contraseña"
          onClose={() => setShowResetModal(false)}
          className="bg-white p-6 rounded-md w-96 max-w-full shadow-lg"
        >
          <p className="mb-4 text-sm text-gray-700">
            Introduce tu correo electrónico para recibir un enlace de restablecimiento.
          </p>
          <label htmlFor="reset-email" className="sr-only">Correo electrónico para recuperar contraseña</label>
          <input
            id="reset-email"
            name="reset-email"
            type="email"
            autoComplete="email"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            placeholder="tu@ejemplo.com"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          {resetMsg && <p className="text-green-600 mb-2" role="status">{resetMsg}</p>}
          {resetError && <p className="text-red-600 mb-2" role="alert">{resetError}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowResetModal(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleResetPassword}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Enviar enlace
            </button>
          </div>
        </AccessibleModal>
      )}

      <p className="text-center text-xs text-gray-600 mt-6">
        © {new Date().getFullYear()} Lore Weaver. Todos los derechos reservados.
      </p>
    </div>
  )
}
