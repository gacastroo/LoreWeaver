import { useState, useEffect } from "react";
import API from "@/services/api";

export default function UniverseForm({ onUniverseCreated }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [historiaId, setHistoriaId] = useState("");
  const [historias, setHistorias] = useState([]);
  const [universoCreado, setUniversoCreado] = useState(null);

  useEffect(() => {
    API.get("/historias")
      .then((res) => setHistorias(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("❌ Error al cargar historias:", err);
        setHistorias([]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo) {
      alert("Por favor, escribe un nombre para el universo");
      return;
    }

    try {
      const data = { titulo_universo: titulo };

      if (descripcion) data.descripcion_universo = descripcion;
      if (historiaId) data.historiaId = historiaId;

      const res = await API.post("/universos", data);

      const historiaSeleccionada = historias.find(
        (h) => h.id.toString() === historiaId
      );

      const nuevoUniverso = {
        titulo,
        descripcion,
        historia: historiaSeleccionada?.titulo || "(sin historia)",
      };

      setUniversoCreado(nuevoUniverso);
      onUniverseCreated?.(res.data);

      setTitulo("");
      setDescripcion("");
      setHistoriaId("");
    } catch (error) {
      console.error("❌ Error al crear universo:", error);
      alert("Hubo un error al crear el universo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">
        Crear nuevo universo
      </h2>

      <input
        type="text"
        placeholder="Nombre del universo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
        required
      />

      <textarea
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={3}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
      />

      <select
        value={historiaId}
        onChange={(e) => setHistoriaId(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
      >
        <option value="">Sin historia</option>
        {historias.map((h) => (
          <option key={h.id} value={h.id}>
            {h.titulo}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition"
      >
        Crear universo
      </button>
    </form>
  );
}
