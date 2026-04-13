import { FileText, Tag, BookOpen } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function QuickStats({ stats }) {
  const { theme, t } = useApp();
  const isLight = theme === "light";
  return (
    <div className={`p-4 rounded-lg shadow-sm border ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
      <h2 className={`text-lg font-semibold mb-4 ${isLight ? "text-neutral-800" : "text-gray-100"}`}>{t.estadisticas}</h2>
      <ul className={`space-y-2 text-sm ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>
        <li>
          <Tag className="inline w-4 h-4 mr-2 text-pink-500" />
          {t.tags}: {stats.tags}
        </li>
        <li>
          <BookOpen className="inline w-4 h-4 mr-2 text-yellow-500" />
          {t.capitulos}: {stats.chapters}
        </li>
        <li>
          <FileText className="inline w-4 h-4 mr-2 text-sky-500" />
          {t.escenas}: {stats.scenes}
        </li>
      </ul>
    </div>
  );
}
