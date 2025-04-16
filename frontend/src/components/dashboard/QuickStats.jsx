import { FileText, Tag, Pencil } from "lucide-react";

export default function QuickStats({ stats }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
      <ul className="space-y-2 text-sm text-neutral-800">
        <li><FileText className="inline w-4 h-4 mr-2" />Scenes: {stats.scenes}</li>
        <li><Tag className="inline w-4 h-4 mr-2" />Tags: {stats.tags}</li>
        <li><Pencil className="inline w-4 h-4 mr-2" />Words: {stats.words.toLocaleString()}</li>
      </ul>
    </div>
  );
}
