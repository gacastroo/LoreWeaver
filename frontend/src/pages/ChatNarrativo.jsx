import { useState, useEffect, useRef } from "react"
import API from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useApp } from "@/context/AppContext"

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
  const { theme, t } = useApp()
  const isLight = theme === "light"

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversacion])

  const handleEnviar = async () => {
    if (!id || isNaN(id) || !mensaje.trim()) { setError(t.seleccionaElementoError); return }
    setError(""); setLoading(true)
    const nuevoMensajeUser = { tipo: "user", texto: mensaje }
    const conversacionActualizada = [...conversacion, nuevoMensajeUser]
    setConversacion(conversacionActualizada)
    try {
      const res = await API.post("/chat", { tipo, id, mensaje, historial: conversacion })
      setConversacion(prev => [...prev, { tipo: "bot", texto: res.data.respuesta }])
    } catch (err) {
      console.error("❌ Error al contactar con la IA:", err)
      setError(err.response?.data?.error || "Error al contactar con la IA")
    } finally {
      setLoading(false); setMensaje("")
    }
  }

  const selectCls = isLight
    ? "bg-white text-neutral-800 border border-neutral-300 px-2 py-1 rounded"
    : "bg-zinc-700 text-white border border-zinc-600 px-2 py-1 rounded"

  return (
    <div className={`min-h-screen flex justify-center items-center p-6 ${isLight ? "bg-gray-100" : "bg-zinc-950"}`}>
      <Card className={`rounded-2xl shadow-xl max-w-3xl w-full border ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
        <CardHeader>
          <CardTitle className={`text-2xl font-bold ${isLight ? "text-neutral-800" : "text-white"}`}>
            {t.chatTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex gap-2">
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={selectCls}>
              {entidades.map(ent => <option key={ent} value={ent}>{ent}</option>)}
            </select>
            <select
              value={id ?? ""}
              onChange={(e) => setId(Number(e.target.value))}
              className={`${selectCls} w-full`}
            >
              <option value="">{t.seleccionaUnLabel} {tipo}</option>
              {elementos.map((el, index) => {
                const idElemento = el.id ?? index
                const nombreElemento = el.titulo || el.nombre || `Elemento ${index + 1}`
                return <option key={idElemento} value={idElemento}>{nombreElemento}</option>
              })}
            </select>
          </div>

          <div className={`border rounded-lg p-4 h-96 overflow-y-auto space-y-4 ${isLight ? "bg-neutral-50 border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
            {conversacion.length === 0 && (
              <p className={`text-sm text-center mt-8 ${isLight ? "text-neutral-400" : "text-zinc-500"}`}>
                {t.seleccionaUnLabel} elemento y empieza a chatear con la IA sobre él.
              </p>
            )}
            {conversacion.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.tipo === "user" ? "text-blue-500" : isLight ? "text-green-700" : "text-green-400"}`}>
                <span className={`text-xs font-semibold uppercase tracking-wide ${isLight ? "text-neutral-400" : "text-zinc-500"}`}>
                  {msg.tipo === "user" ? t.tuLabel : t.iaLabel}
                </span>
                <ReactMarkdown>{msg.texto}</ReactMarkdown>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <Input
            placeholder={t.chatPlaceholder}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleEnviar() } }}
            className={isLight
              ? "bg-white text-neutral-800 placeholder-neutral-400 border border-neutral-300"
              : "bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600"}
          />

          <div className="flex gap-2">
            <Button
              onClick={handleEnviar}
              disabled={loading || !id || !mensaje.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : t.enviar}
            </Button>
            <Button
              onClick={() => setConversacion([])}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
              {t.borrarChat}
            </Button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
