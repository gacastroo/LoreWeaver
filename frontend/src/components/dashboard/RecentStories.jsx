// src/components/dashboard/RecentStories.jsx
export default function RecentStories({ stories }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Stories</h2>
          <button className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800">
            + New Story
          </button>
        </div>
        <div className="space-y-2">
          {stories.map((story, i) => (
            <div key={i} className="flex justify-between items-center border rounded px-4 py-2 hover:bg-neutral-50 transition">
              <div>
                <p className="font-medium text-neutral-800">{story.title}</p>
                <p className="text-sm text-neutral-500">{story.genre} • Last edited {story.updated}</p>
              </div>
              <button className="text-sm text-indigo-600 hover:underline">Open</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  