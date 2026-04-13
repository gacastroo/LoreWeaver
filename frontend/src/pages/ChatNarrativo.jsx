import { useState, useEffect, useRef } from "react"
import API from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

const entidades = ["capitulo", "personaje", "universo"]

export default function ChatNarrativo() {
  const [tipo, setTipo] = useState("capitulo")
  const [id, setId] = useState(null)
  const [elementos, setElementos] = useState([])
  const [mensaje, setMensaje] = useState("")
  const [conversacion, setConversacion] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    const fetchElementos = async () => {
      try {
        const res = await API.get(`/chat/elementos/${tipo}`)
        setElementos(res.data.elementos)
        setId(null)
      } catch (err) {
        console.error("❌ Error obteniendo elementos:", err)
        setElementos([])
      }
    }
    fetchElementos()
  }, [tipo])

  // Autoscroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversacion])

  const handleEnviar = async () => {
    if (!id || isNaN(id) || !mensaje.trim()) {
      setError("Selecciona un elemento válido y escribe un mensaje")
      return
    }

    setError("")
    setLoading(true)

    const nuevoMensajeUser = { tipo: "user", texto: mensaje }
    const conversacionActualizada = [...conversacion, nuevoMensajeUser]
    setConversacion(conversacionActualizada)

    try {
      const res = await API.post("/chat", {
        tipo,
        id,
        mensaje,
        // Enviar el historial previo (sin el mensaje actual, ya lo recibe aparte)
        historial: conversacion
      })
      setConversacion(prev => [...prev, { tipo: "bot", texto: res.data.respuesta }])
    } catch (err) {
      console.error("❌ Error al contactar con la IA:", err)
      const msg = err.response?.data?.error || "Error al contactar con la IA"
      setError(msg)
    } finally {
      setLoading(false)
      setMensaje("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <Card className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-xl max-w-3xl w-full">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-bold">
            🤖 Chat Narrativo con IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex gap-2">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="bg-zinc-700 text-white px-2 py-1 rounded"
            >
              {entidades.map(ent => (
                <option key={ent} value={ent}>{ent}</option>
              ))}
            </select>

            <select
              value={id ?? ""}
              onChange={(e) => setId(Number(e.target.value))}
              className="bg-zinc-700 text-white px-2 py-1 rounded w-full"
            >
              <option value="">Selecciona un {tipo}</option>
              {elementos.map((el, index) => {
                const idElemento = el.id ?? index
                const nombreElemento = el.titulo || el.nombre || `Elemento ${index + 1}`
                return (
                  <option key={idElemento} value={idElemento}>
                    {nombreElemento}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
            {conversacion.length === 0 && (
              <p className="text-zinc-500 text-sm text-center mt-8">
                Selecciona un elemento y empieza a chatear con la IA sobre él.
              </p>
            )}
            {conversacion.map((msg, i) => (
              <div
                key={i}
                className={`text-sm ${msg.tipo === "user" ? "text-blue-300" : "text-green-300"}`}
              >
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">
                  {msg.tipo === "user" ? "Tú" : "IA"}
                </span>
                <ReactMarkdown>{msg.texto}</ReactMarkdown>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <Input
            placeholder="Escribe tu pregunta o idea... (Enter para enviar)"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600"
          />

          <div className="flex gap-2">
            <Button
              onClick={handleEnviar}
              disabled={loading || !id || !mensaje.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Enviar"}
            </Button>

            <Button
              onClick={() => setConversacion([])}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
              Borrar Chat
            </Button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}