import { useApp } from "@/context/AppContext";

export default function SummaryCard({ title, value }) {
  const { theme } = useApp();
  const isLight = theme === "light";
  return (
    <div className={`p-4 rounded-lg shadow-sm border flex flex-col gap-1 ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
      <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{title}</p>
      <p className={`text-2xl font-semibold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>{value}</p>
    </div>
  );
}
