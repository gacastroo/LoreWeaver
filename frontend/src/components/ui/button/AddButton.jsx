import { Plus } from "lucide-react";

export default function AddButton({ onClick, label = "Añadir" }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
    >
      <Plus className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
