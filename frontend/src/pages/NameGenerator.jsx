import { useState } from "react";
import axios from "axios";

export default function NameGenerator() {
  const [type, setType] = useState("fantasy");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
        const res = await axios.post("/api/names/ia", { type }); // ✅ la nueva ruta híbrida
        setName(res.data.name);
    } catch (err) {
      console.error("❌ Error al generar nombre:", err);
      setError("No se pudo generar el nombre. Intenta de nuevo.");
      setName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">🎲 Generador de Nombres Narrativos</h1>

        {/* Select de tipo */}
        <div className="mb-4 text-left">
          <label htmlFor="type" className="block text-sm mb-2 text-gray-300">
            Tipo de personaje
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none"
          >
            <option value="fantasy">Fantástico</option>
            <option value="sciFi">Sci-Fi</option>
            <option value="medieval">Medieval</option>
          </select>
        </div>

        {/* Botón de generar */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors px-6 py-2 rounded text-white font-medium mb-4 w-full"
        >
          {loading ? "Generando..." : "Generar Nombre"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {/* Resultado */}
        {name && (
          <div className="mt-6 text-2xl font-bold text-green-400">
            ✨ {name}
          </div>
        )}

        {/* Ayuda */}
        <div className="mt-10 text-sm text-gray-400">
          Usa este generador para obtener nombres únicos de personajes según el tipo de historia.
        </div>
      </div>
    </div>
  );
}
