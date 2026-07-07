import { useEffect, useState } from "react";
import API from "@/services/api";
import AccessibleModal from "@/components/ui/AccessibleModal";

export default function AsociarUniversoModal({ historiaId, onClose, onSuccess }) {
  const [universosLibres, setUniversosLibres] = useState([]);
  const [universoSeleccionado, setUniversoSeleccionado] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUniversos = async () => {
      try {
        const res = await API.get("/universos");
        // Filtrar universos que no estén asignados a esta historia
        const libres = res.data.filter(
          (u) => u.historiaId !== historiaId
        );
        setUniversosLibres(libres);
        if (libres.length > 0) {
          setUniversoSeleccionado(libres[0].id_Universo.toString());
        } else {
          setUniversoSeleccionado("");
        }
      } catch (err) {
        console.error("❌ Error al cargar universos:", err);
        setError("No se pudieron cargar los universos.");
      }
    };

    fetchUniversos();
  }, [historiaId]);

  const asociar = async () => {
    if (!universoSeleccionado) return;
    try {
      await API.patch(`/universos/${universoSeleccionado}/asociar`, {
        historiaId: parseInt(historiaId),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("❌ Error al asociar universo:", err);
      setError("No se pudo asociar el universo.");
    }
  };

  return (
    <AccessibleModal title="Asociar universo existente" onClose={onClose}>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {universosLibres.length === 0 ? (
          <p className="text-sm text-neutral-500 italic mb-6">
            No hay universos disponibles para asociar.
          </p>
        ) : (
          <>
            <label htmlFor="universo-asociado" className="sr-only">Universo a asociar</label>
            <select
              id="universo-asociado"
              value={universoSeleccionado}
              onChange={(e) => setUniversoSeleccionado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
            {universosLibres.map((u) => (
              <option key={u.id_Universo} value={u.id_Universo}>
                {u.titulo_universo}
              </option>
            ))}
            </select>
          </>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={asociar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!universoSeleccionado}
          >
            Asociar
          </button>
        </div>
    </AccessibleModal>
  );
}
