import { useEffect, useState } from "react";
import API from "@/services/api";

export default function SceneForm({ onSceneCreated }) {
  const [titulo, setTitulo] = useState("");
  const [capituloId, setCapituloId] = useState("");
  const [capitulos, setCapitulos] = useState([]);

  useEffect(() => {
    API.get("/capitulos")
      .then((res) => setCapitulos(res.data))
      .catch((err) => console.error("❌ Error al cargar capítulos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !capituloId) {
      return alert("Completa el título y selecciona un capítulo");
    }

    try {
      await API.post("/escenas", {
        titulo_escena: titulo,
        capituloId,
      });

      setTitulo("");
      setCapituloId("");
      onSceneCreated?.();
    } catch (error) {
      console.error("❌ Error al crear escena:", error);
      alert("Error al crear escena");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nueva escena</h2>

      <label htmlFor="scene-title" className="sr-only">Título de la escena</label>
      <input
        id="scene-title"
        name="scene-title"
        type="text"
        placeholder="Título de la escena"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      />

      <label htmlFor="scene-chapter" className="sr-only">Capítulo de la escena</label>
      <select
        id="scene-chapter"
        name="scene-chapter"
        value={capituloId}
        onChange={(e) => setCapituloId(e.target.value)}
        className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        <option value="">Selecciona un capítulo</option>
        {capitulos.map((c) => (
          <option key={c.id_Capitulo} value={c.id_Capitulo}>
            {c.titulo_capitulo}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
        Crear escena
      </button>
    </form>
  );
}
