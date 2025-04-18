import { useEffect, useState } from "react";
import SectionHeader from "@/components/character/SectionHeader";
import AddButton from "@/components/ui/button/AddButton";
import CharacterGrid from "@/components/character/CharacterGrid";
import API from "@/services/api"; // Axios con token incluido

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await API.get("/personajes"); // 👈 Conéctate al backend
        setCharacters(res.data);
      } catch (error) {
        console.error("❌ Error al cargar personajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleAddCharacter = () => {
    console.log("🧙 Mostrar modal para crear nuevo personaje");
  };

  if (loading) {
    return <p className="p-6 text-neutral-500">Cargando personajes...</p>;
  }

  return (
    <div className="flex flex-col h-full w-full bg-neutral-100 px-8 py-6 overflow-auto">
      <SectionHeader title="Personajes">
        <AddButton onClick={handleAddCharacter} label="Nuevo personaje" />
      </SectionHeader>
      {characters.length > 0 ? (
        <CharacterGrid characters={characters} />
      ) : (
        <p className="text-sm text-neutral-500">No hay personajes aún.</p>
      )}
    </div>
  );
}
