export default function Select({ label, value, onChange, options }) {
    return (
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          className="w-full border border-neutral-300 rounded px-3 py-2 text-sm"
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
  