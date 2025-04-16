// src/pages/Characters.jsx
import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import AddCharacterButton from "@/components/AddCharacterButton";
import CharacterGrid from "@/components/CharacterGrid";

const mockCharacters = [
  {
    id: 1,
    name: "Aria Moonshade",
    image: "/images/aria.jpg",
    description: "Una joven elfa con un oscuro secreto.",
  },
  {
    id: 2,
    name: "Darius Stormborn",
    image: "/images/darius.jpg",
    description: "Guerrero forjado en el exilio.",
  },
];

export default function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setCharacters(mockCharacters);
  }, []);

  const handleAddCharacter = () => {
    console.log("Modal para nuevo personaje");
  };

  return (
    <div className="flex flex-col h-full w-full overflow-auto">
      <SectionHeader title="Personajes">
        <AddCharacterButton onClick={handleAddCharacter} />
      </SectionHeader>
      <CharacterGrid characters={characters} />
    </div>
  );
}
