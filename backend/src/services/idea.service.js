import prisma from "../lib/prisma.js"
import aiService from "./openai.service.js"

export const generarIdeaNarrativa = async (req, res) => {
  try {
    const userId = req.usuario?.id_usuario || req.usuario?.id
    const { historiaTitulo } = req.body


    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" })
    }

    if (!historiaTitulo) {
      return res.status(400).json({ error: "El título de la historia es obligatorio" })
    }

    const user = await prisma.usuario.findUnique({
      where: { id_usuario: userId }
    })

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    const prompt = buildPrompt(user.nombre, historiaTitulo)

    const idea = await aiService.getAIRecommendation(prompt)

    res.status(200).json({ idea })
  } catch (error) {
    console.error("❌ Error al generar idea narrativa:", error)
    res.status(500).json({ error: "Error al generar idea narrativa" })
  }
}

const buildPrompt = (nombre, titulo) => `
Eres un generador de ideas narrativas. Ayuda a ${nombre} a crear una historia llamada "${titulo}".

Instrucciones:
1. Resume la trama en 4-5 líneas.
2. Incluye un conflicto principal y personajes sugeridos.
3. Usa un tono inspirador y creativo.

Título: ${titulo}
Usuario: ${nombre}
`.trim()