    // src/components/ui/OpenButton.jsx
    import { ArrowRight } from "lucide-react";

    export default function OpenButton({ onClick, label = "Open" }) {
    return (
        <button
        onClick={onClick}
        className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors"
        >
        {label}
        <ArrowRight className="w-4 h-4" />
        </button>
    );
    }