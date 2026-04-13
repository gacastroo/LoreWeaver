import { useEffect, useState } from "react";
import SectionHeader from "@/components/character/SectionHeader";
import AddButton from "@/components/ui/button/AddButton";
import CharacterGrid from "@/components/character/CharacterGrid";
import CharacterForm from "@/components/character/CharacterForm";
import API from "@/services/api";
import Select from "@/components/ui/input/Select";
import { useApp } from "@/context/AppContext";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [filtroTag, setFiltroTag] = useState("");
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const personajesFiltrados = filtroTag
    ? characters.filter((p) => p.tags.some((tg) => tg.tagId === parseInt(filtroTag)))
    : characters;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await API.get("/tags");
        setTags(res.data);
      } catch (error) {
        console.error("❌ Error al cargar tags:", error);
      }
    };
    fetchTags();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const res = await API.get("/personajes");
      setCharacters(res.data);
    } catch (error) {
      console.error("❌ Error al cargar personajes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCharacters(); }, []);

  const handleDeleteCharacter = async (id) => {
    try {
      await API.delete(`/personajes/${id}`);
      setCharacters((prev) => prev.filter((c) => c.id_Personaje !== id));
    } catch (error) {
      console.error("❌ Error al eliminar personaje:", error);
    }
  };

  const handlePersonajeCreado = async () => {
    await fetchCharacters();
    setMostrarModal(false);
  };

  return (
    <div className={`flex flex-col h-full w-full px-8 py-6 overflow-auto space-y-4 ${isLight ? "bg-neutral-100" : "bg-zinc-950"}`}>
      <SectionHeader title={t.tituloPersonajes}>
        <AddButton onClick={() => setMostrarModal(true)} label={t.nuevoPersonajeBtn} />
      </SectionHeader>

      <div className="mb-6 w-64">
        <Select
          label={t.filtrarPorTag}
          value={filtroTag}
          onChange={(e) => setFiltroTag(e.target.value)}
          options={[
            { value: "", label: t.todosLosTags },
            ...tags.map((tg) => ({ value: tg.id_Tag.toString(), label: `#${tg.nombre_tag}` })),
          ]}
        />
      </div>

      {loading ? (
        <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.cargandoPersonajes}</p>
      ) : personajesFiltrados.length > 0 ? (
        <CharacterGrid characters={personajesFiltrados} onDelete={handleDeleteCharacter} />
      ) : (
        <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.noPersonajes}</p>
      )}

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`rounded-2xl p-6 max-w-xl w-full relative shadow-lg ${isLight ? "bg-white" : "bg-zinc-800"}`}>
            <button onClick={() => setMostrarModal(false)} className="absolute top-3 right-4 text-xl text-zinc-400 hover:text-red-500">✖</button>
            <CharacterForm onCharacterCreated={handlePersonajeCreado} />
          </div>
        </div>
      )}
    </div>
  );
}
