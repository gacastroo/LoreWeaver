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
    API.get("/historias")
      .then((res) => {
        setHistorias(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("❌ Error al cargar historias:", err));

    API.get("/tags")
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

      const res = await API.post("/personajes", data);

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
      <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
        Crear nuevo personaje
      </h2>

      <label htmlFor="character-name" className="sr-only">Nombre del personaje</label>
      <input
        id="character-name"
        name="character-name"
        type="text"
        placeholder="Nombre del personaje"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        required
      />

      <label htmlFor="character-description" className="sr-only">Descripción del personaje</label>
      <textarea
        id="character-description"
        name="character-description"
        placeholder="Descripción del personaje (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={4}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      />

      <label htmlFor="character-story" className="sr-only">Historia del personaje</label>
      <select
        id="character-story"
        name="character-story"
        value={historiaId}
        onChange={(e) => setHistoriaId(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        <option value="">Sin historia</option>
        {Array.isArray(historias) &&
          historias.map((h) => (
            <option key={h.id} value={h.id}>
              {h.titulo}
            </option>
          ))}
      </select>

      <label htmlFor="character-tag" className="sr-only">Tag del personaje</label>
      <select
        id="character-tag"
        name="character-tag"
        value={tagId}
        onChange={(e) => setTagId(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
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
