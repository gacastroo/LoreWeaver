import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/api"; // ✅ Instancia personalizada de Axios

export default function NameGenerator() {
  const [type, setType] = useState("fantasy");
  const [name, setName] = useState("");
  const [historiaId, setHistoriaId] = useState("");
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/api/historias");
        setHistorias(res.data);
        if (res.data.length > 0) {
          setHistoriaId(res.data[0].id.toString());
        }
      } catch (err) {
        console.error("❌ Error al cargar historias:", err);
      }
    };
    fetchHistorias();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await API.post("/api/names/ia", { type }); // ✅ CORREGIDO
      setName(res.data.name);
    } catch (err) {
      console.error("❌ Error al generar nombre:", err);
      setError("No se pudo generar el nombre. Intenta de nuevo.");
      setName("");
    } finally {
      setLoading(false);
    }
  };

  const crearPersonaje = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await API.post("/api/personajes", {
        nombre: name,
        descripcion: "",
        historiaId: parseInt(historiaId),
      });
      setSuccess(`✅ Personaje "${res.data.nombre_personaje}" creado correctamente`);
      navigate("/characters");
    } catch (err) {
      console.error("❌ Error al crear personaje:", err);
      setError("Error al crear personaje. Verifica tu sesión.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">🎲 Generador de Nombres Narrativos</h1>

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

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors px-6 py-2 rounded text-white font-medium mb-4 w-full"
        >
          {loading ? "Generando..." : "Generar Nombre"}
        </button>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-4">{success}</p>}

        {name && (
          <div className="mt-6 space-y-4">
            <div className="text-2xl font-bold text-green-400">✨ {name}</div>

            <div className="text-left">
              <label className="block text-sm mb-2 text-gray-300">Asociar a historia:</label>
              <select
                value={historiaId}
                onChange={(e) => setHistoriaId(e.target.value)}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none"
              >
                {historias.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.titulo}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={crearPersonaje}
              className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-2 rounded text-white font-medium w-full"
            >
              Crear personaje con este nombre
            </button>
          </div>
        )}

        <div className="mt-10 text-sm text-gray-400">
          Usa este generador para obtener nombres únicos de personajes según el tipo de historia.
        </div>
      </div>
    </div>
  );
}
