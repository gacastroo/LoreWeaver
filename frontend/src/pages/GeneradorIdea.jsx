import { useState } from "react"
import API from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useApp } from "@/context/AppContext"

export default function GeneradorIdea() {
  const [titulo, setTitulo] = useState("")
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { theme, t } = useApp()
  const isLight = theme === "light"

  const handleGenerar = async () => {
    if (!titulo.trim()) { setError(t.errorIdea); return }
    setError(""); setIdea(""); setLoading(true)
    try {
      const res = await API.post("/ideas/generar", { historiaTitulo: titulo })
      setIdea(res.data.idea)
    } catch (err) {
      console.error("❌ Error generando idea:", err)
      setError("Ocurrió un error al generar la idea.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex justify-center items-center p-6 ${isLight ? "bg-gray-100" : "bg-zinc-950"}`}>
      <Card className={`rounded-2xl shadow-xl max-w-2xl w-full border ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
        <CardHeader>
          <CardTitle className={`text-2xl font-bold ${isLight ? "text-neutral-800" : "text-white"}`}>
            {t.genIdeasTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input
            placeholder={t.tituloHistoriaIdeasPlaceholder}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleGenerar() }}
            className={isLight
              ? "bg-white text-neutral-800 placeholder-neutral-400 border border-neutral-300"
              : "bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600"}
          />
          <Button
            onClick={handleGenerar}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : t.generarIdea}
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {idea && (
            <div
              className={`prose rounded-xl p-4 overflow-y-auto shadow-inner border ${
                isLight
                  ? "bg-neutral-50 text-neutral-800 border-neutral-200 prose-neutral"
                  : "prose-invert bg-zinc-800 text-white border-zinc-600"
              }`}
              style={{ maxHeight: "300px" }}
            >
              <ReactMarkdown>{idea}</ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
