import { useState } from "react";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import ViewButton from "@/components/ui/button/ViewButton";

export default function UniverseCard({ universo, historias, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  // Buscar el nombre de la historia relacionada
  const historia = historias.find(h => h.id === universo.historiaId);

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-lg font-semibold text-indigo-700 mb-1">
            {universo.titulo_universo}
          </h2>
          <p className="text-sm text-neutral-600 mb-2 italic">
            {universo.descripcion_universo || "Sin descripción"}
          </p>
          <p className="text-xs text-neutral-500">
            Historia: <span className="font-medium">{historia?.titulo || "Desconocida"}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
        </div>

        {showModal && (
          <DeleteConfirmModal
            onCancel={() => setShowModal(false)}
            onConfirm={() => {
              onDelete();
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
