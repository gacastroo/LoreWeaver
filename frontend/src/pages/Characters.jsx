import { useEffect, useState } from "react";
import SectionHeader from "@/components/character/SectionHeader";
import AddButton from "@/components/ui/button/AddButton";
import CharacterGrid from "@/components/character/CharacterGrid";
import API from "@/services/api";

// IMPORTANTE: Asegúrate de tener este componente
import Select from "@/components/ui/input/Select"; // Ajusta la ruta si es diferente

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historias, setHistorias] = useState([]);
  const [filtroHistoria, setFiltroHistoria] = useState("");

  const personajesFiltrados = filtroHistoria
  ? characters.filter((p) => p.historiaId === parseInt(filtroHistoria))
  : characters;


  // Cargar historias
  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const res = await API.get("/historias");
        setHistorias(res.data);
      } catch (error) {
        console.error("❌ Error al cargar historias:", error);
      }
    };
    fetchHistorias();
  }, []);

  // Cargar personajes
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const url = filtroHistoria
          ? `/personajes?historiaId=${filtroHistoria}`
          : "/personajes";
        const res = await API.get(url);
        setCharacters(res.data);
      } catch (error) {
        console.error("❌ Error al cargar personajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filtroHistoria]);

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

      {/* Select para filtrar por historia */}
      <div className="mb-6 w-64">
        <Select
          label="Filtrar por historia"
          value={filtroHistoria}
          onChange={(e) => setFiltroHistoria(e.target.value)}
          options={[
            { value: "", label: "Todas las historias" },
            ...historias.map((h) => ({
              value: h.id.toString(),
              label: h.titulo,
            })),
          ]}
        />
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Cargando personajes...</p>
      ) : characters.length > 0 ? (
      <CharacterGrid characters={personajesFiltrados} onDelete={handleDeleteCharacter} />
      ) : (
        <p className="text-sm text-neutral-500">No hay personajes para esta historia.</p>
      )}
    </div>
  );
}
