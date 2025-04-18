export default function SectionHeader({ title, children }) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">{title}</h1>
        {children}
      </div>
    );
  }
  