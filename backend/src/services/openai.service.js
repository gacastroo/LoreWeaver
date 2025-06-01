import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const apiUrl = process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions"
const apiKey = process.env.OPENAI_API_KEY
const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo"

if (!apiUrl || !apiKey) {
  console.error("❌ Faltan variables de entorno OPENAI_API_URL o OPENAI_API_KEY")
  throw new Error("No se puede inicializar el servicio de OpenAI")
}

const getAIRecommendation = async (prompt) => {
  try {
    console.log("📤 Enviando prompt a OpenAI...")
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
        max_tokens: 700,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    )

    const content = response.data.choices?.[0]?.message?.content
    console.log("✅ Respuesta recibida de OpenAI")
    return content || "No se pudo generar una idea."
  } catch (error) {
    const status = error.response?.status
    const data = error.response?.data

    console.error("❌ Error con OpenAI:")
    console.error("Status:", status)
    console.error("Data:", data)

   console.error("❌ OpenAI Error Details:", error.response?.data || error.message)
   throw new Error("Error al obtener la recomendación de IA.")

  }
}

export default {
  getAIRecommendation,
}
