import { useNavigate } from "react-router-dom";
import OpenButton from "@/components/ui/button/OpenButton";

export default function RecentStories({ stories }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Stories</h2>
        <OpenButton onClick={() => navigate("/new-story")} label="Nueva historia" />
      </div>
      <div className="space-y-2">
        {stories.map((story, i) => (
          <div key={i} className="flex justify-between items-center border rounded px-4 py-2 hover:bg-neutral-50 transition">
            <div>
              <p className="font-medium text-neutral-800">{story.title}</p>
              <p className="text-sm text-neutral-500">
                {story.genre} • Última edición {story.updated}
              </p>
            </div>
            <OpenButton onClick={() => navigate(`/historia/${story.id}`)} label="Abrir" />
          </div>
        ))}
      </div>
    </div>
  );
}
