import { useEffect, useState } from "react";
import SectionHeader from "@/components/character/SectionHeader";
import AddButton from "@/components/ui/button/AddButton";
import CharacterGrid from "@/components/character/CharacterGrid";
import API from "@/services/api";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historias, setHistorias] = useState([]);
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState("");

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

  // Cargar personajes (con o sin filtro)
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const url = historiaSeleccionada
          ? `/personajes?historiaId=${historiaSeleccionada}`
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
  }, [historiaSeleccionada]);

  const handleDeleteCharacter = async (id) => {
    try {
      await API.delete(`/personajes/${id}`);
      setCharacters(prev => prev.filter(c => c.id_Personaje !== id));
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
      <div className="flex items-center gap-2">
        <label className="text-sm text-neutral-700">Filtrar por historia:</label>
        <select
          value={historiaSeleccionada}
          onChange={(e) => setHistoriaSeleccionada(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="">Todas</option>
          {historias.map((h) => (
            <option key={h.id} value={h.id}>
              {h.titulo}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Cargando personajes...</p>
      ) : characters.length > 0 ? (
        <CharacterGrid 
        characters={characters}
        onDelete={handleDeleteCharacter}
         />
      ) : (
        <p className="text-sm text-neutral-500">No hay personajes para esta historia.</p>
      )}
    </div>
  );
}
