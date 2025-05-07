import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "@/components/ui/button/DeleteButton";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function UniverseCard({ universo, historias, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Buscar el nombre de la historia relacionada
  const historia = historias.find(h => h.id === universo.historiaId);

  // Limitar la descripción
  const descripcionCorta = universo.descripcion_universo?.length > 120
    ? universo.descripcion_universo.slice(0, 120) + "..."
    : universo.descripcion_universo || "Sin descripción";

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-lg font-semibold text-indigo-700 mb-1">
            {universo.titulo_universo}
          </h2>
          <p className="text-sm text-neutral-600 mb-2 italic">
            {descripcionCorta}
          </p>
          <p className="text-xs text-neutral-500">
            Historia: <span className="font-medium">{historia?.titulo || "Desconocida"}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <ViewButton onClick={() => navigate(`/universo/${universo.id_Universo}`)} label="Ver más" />
          <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
        </div>

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
