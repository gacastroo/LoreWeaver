export default function Select({ label, value, onChange, options, isLight = true }) {
  return (
    <div>
      <label className={`block text-sm font-medium mb-1 ${isLight ? "text-gray-700" : "text-gray-100"}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 text-sm transition-colors
          ${isLight
            ? "border-neutral-300 bg-white text-gray-800"
            : "border-zinc-600 bg-zinc-800 text-gray-100"
          }`}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
