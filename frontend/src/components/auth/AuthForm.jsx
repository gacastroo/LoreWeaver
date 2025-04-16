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
  const navigate = useNavigate()

  const handleSubmit = async () => {
    // VALIDACIÓN BÁSICA
    if (!email || !password) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }
  
    if (!email.includes("@")) {
      alert("❌ El correo electrónico no es válido.");
      return;
    }
  
    if (password.length < 6) {
      alert("❌ La contraseña debe tener al menos 6 caracteres.");
      return;
    }
  
    if (registro && !nombre.trim()) {
      alert("❌ El nombre es obligatorio para registrarse.");
      return;
    }
  
    try {
      const endpoint = registro ? "/usuarios/registro" : "/usuarios/login";
      const payload = registro
        ? { email, password, nombre }
        : { email, password };
  
      const res = await API.post(endpoint, payload);
      const { token } = res.data;
  
      if (token) {
        localStorage.setItem("token", token);
  
        if (registro) {
          setRegistro(false);
          alert("✅ Cuenta creada correctamente. Ahora inicia sesión.");
        } else {
          navigate("/Inicio");
        }
      } else {
        alert("❌ No se recibió un token del servidor.");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      const msg = error.response?.data?.message || "Error inesperado";
      alert("🚫 " + msg);
    }
  };
  
  return (
    <div className="w-full max-w-md">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm text-gray-700">
                Contraseña
              </Label>
              {!registro && (
                <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              )}
            </div>
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

          <button
            className="text-sm text-gray-100 transition-colors"
            onClick={() => setRegistro(!registro)}
          >
            {registro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </CardFooter>
      </Card>

      <p className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} Lore Weaver. Todos los derechos reservados.
      </p>
    </div>
  )
}
