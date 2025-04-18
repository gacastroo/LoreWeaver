import UniverseCard from "./UniverseCard";

export default function UniverseGrid({ universes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {universes.map((universe) => (
        <UniverseCard key={universe.id_Universo} universe={universe} />
      ))}
    </div>
  );
}
