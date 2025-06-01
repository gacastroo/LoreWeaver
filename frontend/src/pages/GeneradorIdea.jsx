import { useState } from "react"
import API from "@/services/api" // asegúrate de tener configurado Axios con baseURL y JWT
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/inpuut"
import { Loader2 } from "lucide-react"

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
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🧠 Generador de Ideas Narrativas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Escribe el título de tu historia..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Button onClick={handleGenerar} disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Generar Idea"}
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {idea && (
            <Textarea
              className="min-h-[160px] border border-gray-300 bg-gray-50 p-3"
              value={idea}
              readOnly
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
