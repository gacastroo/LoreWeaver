// src/components/ui/OpenButton.jsx
import { ArrowRight } from "lucide-react";

export default function OpenButton({ onClick, label = "Abrir" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {label}
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
