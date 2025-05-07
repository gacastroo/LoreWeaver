// src/components/scene/SceneCard.jsx
import { useState } from "react";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function SceneCard({ escena, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-indigo-700 mb-1">{escena.titulo_escena}</h2>
        <p className="text-sm text-neutral-700">
          <strong>Capítulo:</strong> {escena.capitulo?.titulo_capitulo || "—"}
        </p>
        <p className="text-sm text-neutral-700">
          <strong>Historia:</strong>{" "}
          {escena.capitulo?.historia?.titulo || escena.historia?.titulo || "—"}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            onDelete(escena.id_Escena);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
