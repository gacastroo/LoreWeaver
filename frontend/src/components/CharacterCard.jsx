// components/CharacterCard.jsx
export default function CharacterCard({ character }) {
    return (
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{character.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{character.description}</p>
          <button className="text-blue-600 text-sm mt-3 hover:underline">Ver más</button>
        </div>
      </div>
    );
  }
  