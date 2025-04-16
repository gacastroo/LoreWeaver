// src/components/character/DeleteCharacterButton.jsx
import { Trash2 } from "lucide-react";

export default function DeleteCharacterButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-red-500 py-2 rounded-md hover:bg-red-600 transition-colors"
    >
      <Trash2 className="w-4 h-4 text-white" />
      Eliminar
    </button>
  );
}