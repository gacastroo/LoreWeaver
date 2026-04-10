import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

// Configuración de OpenRouter (usa DeepSeek u otro modelo compatible)
const apiUrl = process.env.OPENAI_API_URL || "https://openrouter.ai/api/v1/chat/completions"
const apiKey = process.env.OPENAI_API_KEY
const model = process.env.OPENAI_MODEL || "deepseek-chat"

// ✅ Aviso en consola pero sin romper el arranque del servidor
if (!apiUrl || !apiKey) {
  console.warn("⚠️ Faltan variables de entorno OPENAI_API_URL o OPENAI_API_KEY — las rutas de IA devolverán error 503")
}

const getAIRecommendation = async (prompt) => {
  // ✅ Comprobación en runtime en vez de al importar el módulo
  if (!apiKey) {
    throw new Error("Servicio de IA no configurado: falta OPENAI_API_KEY")
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        model,
        messages: [
          {
            role: "system",
            content: "Eres un generador de ideas narrativas creativo y original. Da respuestas claras y útiles.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
          "X-Title": "LoreWeaver",
        },
      }
    )

    const content = response.data.choices?.[0]?.message?.content
    return content || "No se pudo generar una idea."
  } catch (error) {
    const status = error.response?.status
    const data = error.response?.data

    console.error("❌ Error con OpenRouter:")
    console.error("Status:", status)
    console.error("Data:", JSON.stringify(data))

    if (status === 401) {
      throw new Error("API key inválida o sin permisos")
    }
    if (status === 429) {
      throw new Error("Límite de peticiones alcanzado, inténtalo más tarde")
    }

    throw new Error("Error al obtener la recomendación de IA.")
  }
}

export default {
  getAIRecommendation,
}
