import { useState, useEffect } from "react"
import API from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

const entidades = ["historia", "personaje", "universo"]

export default function ChatNarrativo() {
  const [tipo, setTipo] = useState("historia")
  const [id, setId] = useState(null)
  const [elementos, setElementos] = useState([])
  const [mensaje, setMensaje] = useState("")
  const [conversacion, setConversacion] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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

  const handleEnviar = async () => {
    if (!id || isNaN(id) || !mensaje.trim()) {
      setError("Selecciona un elemento válido y escribe un mensaje")
      return
    }

    setError("")
    setLoading(true)
    setConversacion(prev => [...prev, { tipo: "user", texto: mensaje }])

    try {
      const res = await API.post("/chat", {
        tipo,
        id,
        mensaje
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
                const idElemento = el[`id_${tipo}`] ?? el.id ?? index
                const nombreElemento = el.titulo || el.nombre || `Elemento ${index + 1}`
                return (
                  <option key={idElemento} value={idElemento}>
                    {nombreElemento}
                  </option>
                )
              })}
            </select>
          </div>

          <Input
            placeholder="Escribe tu pregunta o idea..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
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

          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 max-h-96 overflow-y-auto space-y-4">
            {conversacion.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.tipo === "user" ? "text-blue-300" : "text-green-300"}`}>
                <ReactMarkdown>{msg.texto}</ReactMarkdown>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
