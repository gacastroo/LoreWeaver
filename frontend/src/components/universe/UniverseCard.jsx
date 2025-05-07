import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function UniverseCard({ universo, historias, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Buscar la historia asociada
  const historia = historias.find((h) => h.id === universo.historiaId);

  // Cortar descripción si es muy larga
  const descripcionCorta =
    universo.descripcion_universo?.length > 120
      ? universo.descripcion_universo.slice(0, 120) + "..."
      : universo.descripcion_universo || "Sin descripción";

  return (
    <div className="bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-xl shadow border border-neutral-200 hover:shadow-md transition p-5">
      <div className="flex flex-col h-full justify-between">

        {/* Título y descripción */}
        <div>
          <h2 className="text-xl font-bold text-indigo-700 mb-1">
            {universo.titulo_universo}
          </h2>

          {descripcionCorta && (
            <p className="text-sm text-neutral-600 italic mb-2">
              {descripcionCorta}
            </p>
          )}

          <p className="text-sm text-neutral-700">
            <strong>Historia:</strong>{" "}
            {historia?.titulo || "Sin historia asignada"}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-2 mt-4">
          <ViewButton
            onClick={() => navigate(`/universo/${universo.id_Universo}`)}
            label="Ver más"
          />
          <DeleteButton
            onClick={() => setShowModal(true)}
            label="Eliminar"
          />
        </div>

        {/* Modal de confirmación */}
        {showModal && (
          <DeleteConfirmModal
            onCancel={() => setShowModal(false)}
            onConfirm={() => {
              onDelete(universo.id_Universo);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
