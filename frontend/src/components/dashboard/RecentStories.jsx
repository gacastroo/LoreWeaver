import { useNavigate } from "react-router-dom";
import OpenButton from "@/components/ui/button/OpenButton";
import { useApp } from "@/context/AppContext";

export default function RecentStories({ stories }) {
  const navigate = useNavigate();
  const { theme, t } = useApp();
  const isLight = theme === "light";

  return (
    <div className={`p-4 rounded-lg shadow-sm border ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${isLight ? "text-neutral-900" : "text-gray-100"}`}>{t.historiasRecientes}</h2>
      </div>
      <div className="space-y-2">
        {stories.map((story, i) => (
          <div key={i} className={`flex justify-between items-center border rounded px-4 py-2 transition ${isLight ? "border-neutral-200 hover:bg-neutral-50" : "border-zinc-700 hover:bg-zinc-700"}`}>
            <div>
              <p className={`font-medium ${isLight ? "text-neutral-800" : "text-gray-200"}`}>{story.title}</p>
              <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>
                • {t.ultimaEdicion} {story.updated}
              </p>
            </div>
            <OpenButton onClick={() => navigate(`/historia/${story.id}`)} label={t.abrir} />
          </div>
        ))}
      </div>
    </div>
  );
}
