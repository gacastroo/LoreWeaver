import { Eye } from "lucide-react";

export default function ViewButton({ onClick, label = "Ver más" }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-center gap-2 text-sm font-medium text-neutral-800 bg-neutral-200 py-2 rounded-md hover:bg-neutral-300 transition-colors">

      <Eye className="w-4 h-4 text-neutral-600" />
      {label}
    </button>
  );
}