import dotenv from "dotenv"
import getAI from "../services/openai.service.js"
dotenv.config()

// Fallback local
const localNames = {
  fantasy: ["Aerion", "Nymeria", "Zalara", "Thalor", "Eldarion", "Vaelis", "Lyra", "Drakar"],
  sciFi: ["Xenon", "Zara-12", "Axiom", "Kael", "Nova", "T3-Rex", "Zelix", "Threx"],
  medieval: ["Godric", "Isolde", "Beatrix", "Cedric", "Rowena", "Alaric", "Thorn", "Morgana"],
}

// 🔧 Controlador principal mejorado
export const generarNombreConIA = async (req, res) => {
  const { type = "fantasy", gender = "masculino" } = req.body;

  const promptNombre = `Dame un solo nombre de personaje ${gender} estilo ${type}. No des explicaciones, solo el nombre.`;
  const promptDescripcion = (nombre) => 
    `Dame una breve descripción (1-2 frases) para un personaje llamado "${nombre}". Es un personaje ${gender} de una historia de estilo ${type}. No des explicaciones adicionales.`;

  try {
    // 1. Generar nombre
    const texto = await getAI.getAIRecommendation(promptNombre);
    const nombreExtraído = texto?.split("\n")[0]?.split(" ")[0]?.trim();
    const nombre = nombreExtraído.replace(/[^a-zA-Z0-9\-]/g, "");

    if (!nombre || nombre.length < 2) throw new Error("Nombre inválido");

    // 2. Generar descripción
    const descripcionTexto = await getAI.getAIRecommendation(promptDescripcion(nombre));
    const descripcion = descripcionTexto.split("\n")[0]?.trim();

    console.log("✅ Nombre generado con IA:", nombre);
    console.log("📝 Descripción generada con IA:", descripcion);

    return res.json({ name: nombre, descripcion, from: "ia" });
  } catch (error) {
    console.warn("⚠️ Fallback a nombre local:", error.message);
    const fallback = obtenerNombreLocal(type);
    return res.json({ name: fallback, descripcion: "", from: "local" });
  }
}

// 🔁 Fallback local
const obtenerNombreLocal = (type) => {
  const lista = localNames[type] || localNames.fantasy;
  const nombre = lista[Math.floor(Math.random() * lista.length)];
  console.log("🔄 Nombre generado localmente:", nombre);
  return nombre;
}
