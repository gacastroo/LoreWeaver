import { useEffect, useState } from "react";
import API from "@/services/api";
import AccessibleModal from "@/components/ui/AccessibleModal";

export default function AsociarPersonajeModal({ historiaId, onClose, onSuccess }) {
  const [personajesLibres, setPersonajesLibres] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const res = await API.get("/personajes");
        // Filtrar personajes que no estén asignados a esta historia
        const libres = res.data.filter(
          (p) => p.historiaId !== historiaId
        );
        setPersonajesLibres(libres);
        if (libres.length > 0) {
          setPersonajeSeleccionado(libres[0].id_Personaje.toString());
        } else {
          setPersonajeSeleccionado("");
        }
      } catch (err) {
        console.error("❌ Error al cargar personajes:", err);
        setError("No se pudieron cargar los personajes.");
      }
    };

    fetchPersonajes();
  }, [historiaId]);

  const asociar = async () => {
    if (!personajeSeleccionado) return;
    try {
      await API.patch(`/personajes/${personajeSeleccionado}/asociar`, {
        historiaId: parseInt(historiaId),
      });
      onSuccess(); // Recargar lista en padre
      onClose();   // Cerrar modal
    } catch (err) {
      console.error("❌ Error al asociar personaje:", err);
      setError("No se pudo asociar el personaje.");
    }
  };

  return (
    <AccessibleModal title="Asociar personaje existente" onClose={onClose}>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {personajesLibres.length === 0 ? (
          <p className="text-sm text-neutral-500 italic mb-6">
            No hay personajes disponibles para asociar.
          </p>
        ) : (
          <>
            <label htmlFor="personaje-asociado" className="sr-only">Personaje a asociar</label>
            <select
              id="personaje-asociado"
              value={personajeSeleccionado}
              onChange={(e) => setPersonajeSeleccionado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
            {personajesLibres.map((p) => (
              <option key={p.id_Personaje} value={p.id_Personaje}>
                {p.nombre_personaje}
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
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={!personajeSeleccionado}
          >
            Asociar
          </button>
        </div>
    </AccessibleModal>
  );
}
