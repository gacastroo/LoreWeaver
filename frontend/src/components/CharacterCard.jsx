import { Eye, Trash2 } from "lucide-react";

export default function CharacterCard({ character, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-neutral-800">{character.name}</h2>
        <p className="text-sm text-neutral-600 mt-1">{character.description}</p>

        <div className="mt-4 flex flex-col gap-2">
          {/* Ver más */}
          <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-neutral-800 bg-neutral-200 py-2 rounded-md hover:bg-neutral-300 transition-colors">
            <Eye className="w-4 h-4 text-neutral-600" />
            Ver más
          </button>

          {/* Eliminar */}
          <button
            onClick={() => onDelete(character.id)}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-red-500 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
            <Trash2 className="w-4 h-4 text-white" />
            Eliminar
            </button>


        </div>
      </div>
    </div>
  );
}
