import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Fallback local por tipo
const localNames = {
  fantasy: ["Aerion", "Nymeria", "Zalara", "Thalor", "Eldarion", "Vaelis", "Lyra", "Drakar"],
  sciFi: ["Xenon", "Zara-12", "Axiom", "Kael", "Nova", "T3-Rex", "Zelix", "Threx"],
  medieval: ["Godric", "Isolde", "Beatrix", "Cedric", "Rowena", "Alaric", "Thorn", "Morgana"],
};

export const generarNombreConIA = async (req, res) => {
  const { type } = req.body;
  const prompt = `Nombre de personaje tipo ${type}:`;

  const API_KEY = process.env.HUGGINGFACE_API_KEY;
  const modelo = "bigscience/bloom-560m"; // ✅ Modelo accesible
  const url = `https://api-inference.huggingface.co/models/${modelo}`;

  console.log("📤 Intentando generar con Hugging Face:", prompt);
  console.log("🔐 Token cargado:", API_KEY ? "✔️" : "❌ NO DEFINIDO");

  // Si no hay token, ir directo a fallback
  if (!API_KEY) {
    const fallback = obtenerNombreLocal(type);
    return res.json({ name: fallback, from: "local" });
  }

  try {
    const response = await axios.post(
      url,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        timeout: 10000, // seguridad contra cuelgues
      }
    );

    const generatedText = response.data[0]?.generated_text || "";
    const nombre = generatedText.replace(prompt, "").trim().split(" ")[0];

    if (!nombre || nombre.length < 2) {
      throw new Error("Nombre vacío o inválido");
    }

    console.log("✅ Nombre generado con IA:", nombre);
    res.json({ name: nombre, from: "ia" });
  } catch (err) {
    console.warn("⚠️ Error con Hugging Face:", err.response?.data || err.message);
    const fallback = obtenerNombreLocal(type);
    res.json({ name: fallback, from: "local" });
  }
};

// Función auxiliar de fallback
const obtenerNombreLocal = (type) => {
  const lista = localNames[type] || localNames.fantasy;
  const nombre = lista[Math.floor(Math.random() * lista.length)];
  console.log("🔄 Nombre generado localmente:", nombre);
  return nombre;
};
