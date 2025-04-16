// components/SectionHeader.jsx
export default function SectionHeader({ title, children }) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {children}
      </div>
    );
  }
  