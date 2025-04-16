// ✅ src/components/dashboard/RecentActivity.jsx
export default function RecentActivity({ activity }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-sm text-neutral-700">
          {activity.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.text}</span>
              <span className="text-neutral-400 text-xs">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  