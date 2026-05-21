export default function SectionHeader({ title, children, isLight }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className={`text-2xl font-semibold ${isLight ? "text-gray-800" : "text-gray-100"}`}>{title}</h1>
      {children}
    </div>
  );
}
