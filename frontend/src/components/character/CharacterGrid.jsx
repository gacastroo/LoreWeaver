// components/CharacterGrid.jsx
import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {characters.map((char) => (
        <CharacterCard
          key={char.id_Personaje}
          character={char}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
