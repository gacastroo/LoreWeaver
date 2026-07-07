// src/components/character/DeleteCharacterButton.jsx
import { Trash2 } from "lucide-react";

export default function DeleteCharacterButton({ onClick, label = "Eliminar" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-red-500 py-2 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <Trash2 className="w-4 h-4 text-white" aria-hidden="true" />
      {label}
    </button>
  );
}
