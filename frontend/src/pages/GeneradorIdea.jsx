import { useState } from "react"
import API from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/inpuut"
import { Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

export default function GeneradorIdea() {
  const [titulo, setTitulo] = useState("")
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerar = async () => {
    if (!titulo.trim()) {
      setError("Escribe un título para la historia")
      return
    }

    setError("")
    setIdea("")
    setLoading(true)

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
  <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <Card className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-xl max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-bold">
            🧠 Generador de Ideas Narrativas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input
            placeholder="Título de tu historia..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600"
          />
          <Button
            onClick={handleGenerar}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Generar Idea"}
          </Button>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {idea && (
            <div
              className="prose prose-invert bg-zinc-800 text-white border border-zinc-600 rounded-xl p-4 overflow-y-auto shadow-inner"
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
