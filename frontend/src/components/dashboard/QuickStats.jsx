import { FileText, Tag, BookOpen } from "lucide-react";

export default function QuickStats({ stats }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
      <h2 className="text-lg font-semibold text-neutral-800 mb-4">Estadísticas</h2>
      <ul className="space-y-2 text-sm text-neutral-700">
        <li>
          <Tag className="inline w-4 h-4 mr-2 text-pink-500" />
          Tags: {stats.tags}
        </li>
        <li>
          <BookOpen className="inline w-4 h-4 mr-2 text-yellow-500"/>
          Capitulos: {stats.chapters}
        </li>
        <li>
          <FileText className="inline w-4 h-4 mr-2 text-sky-500" />
          Escenas: {stats.scenes}
        </li>
      </ul>
    </div>
  );
}
