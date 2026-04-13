import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/services/api";
import { useApp } from "@/context/AppContext";

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
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const bg = isLight ? "bg-gray-100" : "bg-zinc-950";
  const cardBg = isLight ? "bg-white border border-neutral-200 shadow-sm" : "bg-zinc-800 border border-zinc-700";
  const inputCls = isLight
    ? "w-full p-2 rounded border border-neutral-300 bg-white text-neutral-800"
    : "w-full p-2 rounded border border-zinc-600 bg-zinc-700 text-white";
  const labelCls = isLight ? "block text-sm mb-1 text-neutral-600" : "block text-sm mb-1 text-zinc-300";
  const headingCls = isLight ? "text-2xl font-bold mb-6 text-neutral-800" : "text-2xl font-bold mb-6 text-white";
  const footerCls = isLight ? "mt-10 text-sm text-neutral-400 text-center" : "mt-10 text-sm text-gray-400 text-center";

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/historias");
        setHistorias(res.data);
        if (res.data.length > 0) setHistoriaId(res.data[0].id.toString());
      } catch (err) {
        console.error("❌ Error al cargar historias:", err);
      }
    };
    fetchHistorias();
  }, []);

  const handleGenerate = async () => {
    setLoading(true); setError(""); setSuccess("");
    try {
      const res = await API.post("/names/ia", { type, gender });
      setName(res.data.name);
      setDescripcion(res.data.descripcion || "");
    } catch (err) {
      console.error("❌ Error al generar nombre:", err);
      setError("No se pudo generar el nombre. Intenta de nuevo.");
      setName(""); setDescripcion("");
    } finally {
      setLoading(false);
    }
  };

  const crearPersonaje = async () => {
    setError(""); setSuccess("");
    try {
      const res = await API.post("/personajes", { nombre: name, descripcion, historiaId: parseInt(historiaId) });
      setSuccess(`✅ Personaje "${res.data.nombre_personaje}" creado correctamente`);
      navigate("/characters");
    } catch (err) {
      console.error("❌ Error al crear personaje:", err);
      setError("Error al crear personaje. Verifica tu sesión.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${bg}`}>
      <div className={`w-full max-w-md text-center rounded-2xl p-8 ${cardBg}`}>
        <h1 className={headingCls}>{t.genNombresTitle}</h1>

        <div className="mb-4 text-left">
          <label className={labelCls}>{t.tipo}</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
            <option value="fantasy">{t.fantastico}</option>
            <option value="sciFi">{t.sciFi}</option>
            <option value="medieval">{t.medieval}</option>
          </select>
        </div>

        <div className="mb-4 text-left">
          <label className={labelCls}>{t.genero}</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
            <option value="masculino">{t.masculino}</option>
            <option value="femenino">{t.femenino}</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white w-full px-6 py-2 rounded font-medium mb-4 transition"
        >
          {loading ? t.generando : t.generarNombre}
        </button>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        {name && (
          <div className="space-y-4 mt-6 text-left">
            <div>
              <label className={labelCls}>{t.nombreGenerado}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>{t.descripcionPersonajeLabel}</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>{t.asociarAHistoria}</label>
              <select value={historiaId} onChange={(e) => setHistoriaId(e.target.value)} className={inputCls}>
                {historias.map((h) => (
                  <option key={h.id} value={h.id}>{h.titulo}</option>
                ))}
              </select>
            </div>
            <button
              onClick={crearPersonaje}
              className="bg-green-600 hover:bg-green-700 text-white w-full px-6 py-2 rounded font-medium transition"
            >
              {t.crearPersonajeConNombre}
            </button>
          </div>
        )}

        <div className={footerCls}>{t.usoGenerador}</div>
      </div>
    </div>
  );
}
