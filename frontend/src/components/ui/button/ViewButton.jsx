import { Eye } from "lucide-react";

export default function ViewButton({ onClick, label = "Ver más" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-full flex items-center justify-center gap-2 text-sm font-medium text-neutral-800 bg-neutral-200 py-2 rounded-md hover:bg-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
    >
      <Eye className="w-4 h-4 text-neutral-600" aria-hidden="true" />
      {label}
    </button>
  );
}
