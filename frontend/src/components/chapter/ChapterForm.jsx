import { useState, useEffect } from "react";
import API from "@/services/api";

export default function CapituloForm({ onChapterCreated }) {
  const [titulo, setTitulo] = useState("");
  const [historiaId, setHistoriaId] = useState("");
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    API.get("/historias")
      .then((res) => setHistorias(res.data))
      .catch((err) => console.error("❌ Error al cargar historias:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !historiaId) {
      alert("Completa el título y selecciona una historia");
      return;
    }

    try {
      await API.post("/capitulos", {
        titulo_capitulo: titulo,
        historiaId,
      });

      alert("✅ Capítulo creado correctamente");
      setTitulo("");
      setHistoriaId("");
      onChapterCreated?.();
    } catch (error) {
      console.error("❌ Error al crear capítulo:", error);
      alert("Error al crear capítulo");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nuevo capítulo</h2>

      <input
        type="text"
        placeholder="Título del capítulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 rounded border"
      />

      <select
        value={historiaId}
        onChange={(e) => setHistoriaId(e.target.value)}
        className="w-full p-2 rounded border"
      >
        <option value="">Selecciona una historia</option>
        {historias.map((h) => (
          <option key={h.id} value={h.id}>
            {h.titulo}
          </option>
        ))}
      </select>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Crear capítulo
      </button>
    </form>
  );
}
