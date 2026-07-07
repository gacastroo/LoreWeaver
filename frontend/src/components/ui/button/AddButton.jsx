import { Plus } from "lucide-react";

export default function AddButton({ onClick, label = "Añadir" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
    >
      <Plus className="w-4 h-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
