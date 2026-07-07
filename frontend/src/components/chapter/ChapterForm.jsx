import { useState, useEffect } from "react";
import API from "@/services/api";

export default function CapituloForm({ onChapterCreated }) {
  const [titulo, setTitulo] = useState("");
  const [historiaId, setHistoriaId] = useState("");
  const [historias, setHistorias] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    API.get("/historias")
      .then((res) => setHistorias(res.data))
      .catch((err) => {
        console.error("❌ Error al cargar historias:", err);
        showMessage("error", "Error al cargar las historias");
      });
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 10000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !historiaId) {
      showMessage("error", "Completa el título y selecciona una historia");
      return;
    }

    try {
      await API.post("/capitulos", {
        titulo_capitulo: titulo,
        historiaId,
      });

      const showMessage = (type, text) => {
        setMessage({ type, text });
        const timeout = type === "success" ? 15000 : 10000; // 15s para éxito, 10s para error
        setTimeout(() => setMessage(null), timeout);
      };

      setTitulo("");
      setHistoriaId("");
      onChapterCreated?.();
    } catch (error) {
      console.error("❌ Error al crear capítulo:", error);
      showMessage("error", "Error al crear capítulo");
    }
  };

  return (
    <>
      {/* Toast message */}
      {message && (
        <div
          role="alert"
          aria-live="assertive"
          className={`
            fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded shadow-md text-sm
            ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}
          `}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-center">Crear nuevo capítulo</h2>

        <label htmlFor="chapter-title" className="sr-only">Título del capítulo</label>
        <input
          id="chapter-title"
          name="chapter-title"
          type="text"
          placeholder="Título del capítulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        />

        <label htmlFor="chapter-story" className="sr-only">Historia del capítulo</label>
        <select
          id="chapter-story"
          name="chapter-story"
          value={historiaId}
          onChange={(e) => setHistoriaId(e.target.value)}
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <option value="">Selecciona una historia</option>
          {historias.map((h) => (
            <option key={h.id} value={h.id}>
              {h.titulo}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Crear capítulo
        </button>
      </form>
    </>
  );
}
