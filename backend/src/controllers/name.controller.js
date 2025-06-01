import dotenv from "dotenv"
import getAI from "../services/openai.service.js"
dotenv.config()

// Fallback local
const localNames = {
  fantasy: ["Aerion", "Nymeria", "Zalara", "Thalor", "Eldarion", "Vaelis", "Lyra", "Drakar"],
  sciFi: ["Xenon", "Zara-12", "Axiom", "Kael", "Nova", "T3-Rex", "Zelix", "Threx"],
  medieval: ["Godric", "Isolde", "Beatrix", "Cedric", "Rowena", "Alaric", "Thorn", "Morgana"],
}

// 🔧 Controlador principal
export const generarNombreConIA = async (req, res) => {
  const { type = "fantasy" } = req.body
  const prompt = `Dame un solo nombre de personaje estilo ${type}. No des explicaciones, solo el nombre.`

  try {
    const texto = await getAI.getAIRecommendation(prompt)

    const nombreExtraído = texto?.split("\n")[0]?.split(" ")[0]?.trim()
    const nombre = nombreExtraído.replace(/[^a-zA-Z0-9\-]/g, "")

    if (!nombre || nombre.length < 2) throw new Error("Nombre inválido")

    console.log("✅ Nombre generado con IA:", nombre)
    return res.json({ name: nombre, from: "ia" })
  } catch (error) {
    console.warn("⚠️ Fallback a nombre local:", error.message)
    const fallback = obtenerNombreLocal(type)
    return res.json({ name: fallback, from: "local" })
  }
}

// 🔁 Fallback local
const obtenerNombreLocal = (type) => {
  const lista = localNames[type] || localNames.fantasy
  const nombre = lista[Math.floor(Math.random() * lista.length)]
  console.log("🔄 Nombre generado localmente:", nombre)
  return nombre
}
