import { useEffect, useState } from "react";
import SectionHeader from "@/components/character/SectionHeader";
import AddButton from "@/components/ui/button/AddButton";
import CharacterGrid from "@/components/character/CharacterGrid";
import API from "@/services/api";
import Select from "@/components/ui/input/Select";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [filtroTag, setFiltroTag] = useState("");

  const personajesFiltrados = filtroTag
    ? characters.filter((p) =>
        p.tags.some((t) => t.tagId === parseInt(filtroTag))
      )
    : characters;

  // 🔹 Cargar tags
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

  // 🔹 Cargar personajes (todos)
  useEffect(() => {
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

    fetchCharacters();
  }, []);

  const handleDeleteCharacter = async (id) => {
    try {
      await API.delete(`/personajes/${id}`);
      setCharacters((prev) => prev.filter((c) => c.id_Personaje !== id));
    } catch (error) {
      console.error("❌ Error al eliminar personaje:", error);
    }
  };

  const handleAddCharacter = () => {
    console.log("🧙 Mostrar modal para crear nuevo personaje");
  };

  return (
    <div className="flex flex-col h-full w-full bg-neutral-100 px-8 py-6 overflow-auto space-y-4">
      <SectionHeader title="Personajes">
        <AddButton onClick={handleAddCharacter} label="Nuevo personaje" />
      </SectionHeader>

      {/* 🔽 Select para filtrar por tag */}
      <div className="mb-6 w-64">
        <Select
          label="Filtrar por tag"
          value={filtroTag}
          onChange={(e) => setFiltroTag(e.target.value)}
          options={[
            { value: "", label: "Todos los tags" },
            ...tags.map((t) => ({
              value: t.id_Tag.toString(),
              label: `#${t.nombre_tag}`,
            })),
          ]}
        />
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Cargando personajes...</p>
      ) : personajesFiltrados.length > 0 ? (
        <CharacterGrid
          characters={personajesFiltrados}
          onDelete={handleDeleteCharacter}
        />
      ) : (
        <p className="text-sm text-neutral-500">No hay personajes para este tag.</p>
      )}
    </div>
  );
}
