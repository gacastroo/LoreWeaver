import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

// Configuración de OpenRouter (usa DeepSeek u otro modelo compatible)
const apiUrl = process.env.OPENAI_API_URL || "https://openrouter.ai/api/v1/chat/completions"
const apiKey = process.env.OPENAI_API_KEY
const model = process.env.OPENAI_MODEL || "deepseek-chat"

if (!apiUrl || !apiKey) {
  console.error("❌ Faltan variables de entorno OPENAI_API_URL o OPENAI_API_KEY")
  throw new Error("No se puede inicializar el servicio de OpenAI")
}

const getAIRecommendation = async (prompt) => {
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
          "HTTP-Referer": "http://localhost:3000", // Cambia por tu dominio real si despliegas
          "X-Title": "LoreWeaver", // Nombre de tu aplicación
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
    console.error("Data:", data)

    if (status === 401 || status === 429) {
      console.warn("⚠️ Usando idea simulada por falta de acceso o límite excedido")
    }

    throw new Error("Error al obtener la recomendación de IA.")
  }
}


export default {
  getAIRecommendation,
}