export default function SummaryCard({ title, value }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col gap-1">
        <p className="text-sm text-neutral-500">{title}</p>
        <p className="text-2xl font-semibold text-neutral-800">{value}</p>
      </div>
    );
  }
  