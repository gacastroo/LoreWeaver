// src/components/AddCharacterButton.jsx
import { Plus } from "lucide-react";

export default function AddCharacterButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white text-neutral-800 border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-100 hover:border-neutral-400 transition font-medium"
    >
      <Plus className="w-4 h-4" />
      Añadir personaje
    </button>
  );
}
