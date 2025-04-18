// components/CharacterGrid.jsx
import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {characters.map((char) => (
        <CharacterCard key={char.id_Personaje} character={char} />
      ))}
    </div>
  );
}
