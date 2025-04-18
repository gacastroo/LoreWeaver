export default function UniverseCard({ universo, historias }) {
    const historia = historias.find(h => h.id === universo.historiaId);
  
    return (
      <div className="bg-white rounded-xl shadow border border-neutral-200 hover:shadow-md transition p-5">
        <h2 className="text-lg font-bold text-indigo-700 mb-1">{universo.titulo_universo}</h2>
        <p className="text-sm text-neutral-600 mb-2">{universo.descripcion_universo}</p>
        <p className="text-xs text-neutral-500 italic">
          Historia: {historia?.titulo || "Desconocida"}
        </p>
      </div>
    );
  }
  