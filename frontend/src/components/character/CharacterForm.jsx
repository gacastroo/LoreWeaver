import { useState, useEffect } from "react";
import API from "@/services/api";

export default function CharacterForm({ onCharacterCreated }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [historiaId, setHistoriaId] = useState("");
  const [tagId, setTagId] = useState("");
  const [historias, setHistorias] = useState([]);
  const [tags, setTags] = useState([]);
  const [personajeCreado, setPersonajeCreado] = useState(null);

  // 🔹 Cargar historias y tags
  useEffect(() => {
    API.get("/api/historias")
      .then((res) => {
        setHistorias(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("❌ Error al cargar historias:", err));

    API.get("/api/tags")
      .then((res) => {
        setTags(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("❌ Error al cargar tags:", err);
        setTags([]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre) {
      alert("Por favor, escribe un nombre para el personaje");
      return;
    }

    try {
      const data = { nombre };

      if (descripcion) data.descripcion = descripcion;
      if (historiaId) data.historiaId = historiaId;
      if (tagId) data.tagId = tagId;

      const res = await API.post("/api/personajes", data);

      const historiaSeleccionada = historias.find(
        (h) => h.id.toString() === historiaId
      );

      const nuevoPersonaje = {
        nombre,
        descripcion,
        historia: historiaSeleccionada ? historiaSeleccionada.titulo : null,
      };

      setPersonajeCreado(nuevoPersonaje);
      onCharacterCreated?.(res.data);

      setNombre("");
      setDescripcion("");
      setHistoriaId("");
      setTagId("");
    } catch (error) {
      console.error("❌ Error al crear personaje:", error);
      alert("Hubo un error al crear el personaje");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">
        Crear nuevo personaje
      </h2>

      <input
        type="text"
        placeholder="Nombre del personaje"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
        required
      />

      <textarea
        placeholder="Descripción del personaje (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={4}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
      />

      <select
        value={historiaId}
        onChange={(e) => setHistoriaId(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
      >
        <option value="">Sin historia</option>
        {Array.isArray(historias) &&
          historias.map((h) => (
            <option key={h.id} value={h.id}>
              {h.titulo}
            </option>
          ))}
      </select>

      <select
        value={tagId}
        onChange={(e) => setTagId(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
      >
        <option value="">Sin tag</option>
        {Array.isArray(tags) &&
          tags.map((tag) => (
            <option key={tag.id_Tag} value={tag.id_Tag}>
              {tag.nombre_tag || tag.titulo}
            </option>
          ))}
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition"
      >
        Crear personaje
      </button>
    </form>
  );
}
