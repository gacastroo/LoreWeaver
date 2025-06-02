import prisma from "../lib/prisma.js"
import aiService from "../services/openai.service.js"

export const chatNarrativo = async (req, res) => {
  try {
    const userId = req.usuario?.id_usuario || req.usuario?.id
    const { tipo, id, mensaje } = req.body

    if (!userId || !tipo || !id || !mensaje) {
      return res.status(400).json({ error: "Faltan parámetros" })
    }

    const parsedId = Number(id)
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID inválido" })
    }

    let contexto = ""

    switch (tipo) {
      case "historia": {
        const historia = await prisma.historia.findFirst({
          where: { id: parsedId, usuarioId: userId }
        })
        if (!historia) return res.status(404).json({ error: "Historia no encontrada" })

        contexto = `Título: ${historia.titulo}\nDescripción: ${historia.contenido || "Sin descripción"}`
        break
      }

      case "personaje": {
        const personaje = await prisma.personaje.findFirst({
          where: { id_Personaje: parsedId, usuarioId: userId },
          include: { tags: { include: { tag: true } } }
        })
        if (!personaje) return res.status(404).json({ error: "Personaje no encontrado" })

        const tags = personaje.tags.map(t => t.tag?.nombre_tag).filter(Boolean).join(", ") || "Sin etiquetas"
        contexto = `Nombre: ${personaje.nombre_personaje}\nDescripción: ${personaje.descripcion_personaje || "Sin descripción"}\nTags: ${tags}`
        break
      }

      case "capitulo": {
        const capitulo = await prisma.capitulo.findFirst({
          where: {
            id_Capitulo: parsedId,
            historia: { usuarioId: userId }
          }
        })
        if (!capitulo) return res.status(404).json({ error: "Capítulo no encontrado" })

        contexto = `Título del capítulo: ${capitulo.titulo_capitulo}`
        break
      }

      case "escena": {
        const escena = await prisma.escena.findFirst({
          where: {
            id_Escena: parsedId,
            historia: { usuarioId: userId }
          }
        })
        if (!escena) return res.status(404).json({ error: "Escena no encontrada" })

        contexto = `Título de la escena: ${escena.titulo_escena}`
        break
      }

      case "universo": {
        const universo = await prisma.universo.findFirst({
          where: { id_Universo: parsedId, usuarioId: userId }
        })
        if (!universo) return res.status(404).json({ error: "Universo no encontrado" })

        contexto = `Nombre del universo: ${universo.titulo_universo}\nDescripción: ${universo.descripcion_universo || "Sin descripción"}`
        break
      }

      default:
        return res.status(400).json({ error: "Tipo de entidad inválido" })
    }

    const prompt = `
Actúa como asistente narrativo. El usuario quiere hablar sobre su ${tipo}.

Contexto:
${contexto}

Mensaje del usuario:
"${mensaje}"

Responde de forma clara, creativa y útil.
    `.trim()

    const respuesta = await aiService.getAIRecommendation(prompt)
    res.status(200).json({ respuesta })
  } catch (error) {
    console.error("❌ Error en chatNarrativo:", error)
    res.status(500).json({ error: "Error procesando el chat" })
  }
}
