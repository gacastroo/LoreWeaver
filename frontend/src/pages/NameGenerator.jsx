import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";

export default function NameGenerator() {
  const [type, setType] = useState("fantasy");
  const [gender, setGender] = useState("masculino");
  const [name, setName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [historiaId, setHistoriaId] = useState("");
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/historias");
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
      const res = await API.post("/names/ia", { type, gender });
      setName(res.data.name);
      setDescripcion(res.data.descripcion || "");
    } catch (err) {
      console.error("❌ Error al generar nombre:", err);
      setError("No se pudo generar el nombre. Intenta de nuevo.");
      setName("");
      setDescripcion("");
    } finally {
      setLoading(false);
    }
  };

  const crearPersonaje = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await API.post("/personajes", {
        nombre: name,
        descripcion,
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

        {/* Tipo de personaje */}
        <div className="mb-4 text-left">
          <label htmlFor="type" className="block text-sm mb-1 text-gray-300">Tipo</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
          >
            <option value="fantasy">Fantástico</option>
            <option value="sciFi">Sci-Fi</option>
            <option value="medieval">Medieval</option>
          </select>
        </div>

        {/* Género */}
        <div className="mb-4 text-left">
          <label htmlFor="gender" className="block text-sm mb-1 text-gray-300">Género</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        {/* Botón para generar */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 w-full px-6 py-2 rounded font-medium mb-4"
        >
          {loading ? "Generando..." : "Generar Nombre"}
        </button>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-4">{success}</p>}

        {/* Si hay nombre generado */}
        {name && (
          <div className="space-y-4 mt-6 text-left">
            {/* Nombre editable */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Nombre generado</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
              />
            </div>

            {/* Descripción editable */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Descripción del personaje</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
              />
            </div>

            {/* Historia a asociar */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Asociar a historia</label>
              <select
                value={historiaId}
                onChange={(e) => setHistoriaId(e.target.value)}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
              >
                {historias.map((h) => (
                  <option key={h.id} value={h.id}>{h.titulo}</option>
                ))}
              </select>
            </div>

            {/* Botón para crear personaje */}
            <button
              onClick={crearPersonaje}
              className="bg-green-600 hover:bg-green-700 w-full px-6 py-2 rounded font-medium"
            >
              Crear personaje con este nombre
            </button>
          </div>
        )}

        <div className="mt-10 text-sm text-gray-400 text-center">
          Usa este generador para obtener nombres únicos y personalizados para tus personajes.
        </div>
      </div>
    </div>
  );
}
