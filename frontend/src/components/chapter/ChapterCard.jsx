import { useState } from "react";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function ChapterCard({ chapter, historia, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-indigo-700">{chapter.titulo_capitulo}</h2>
      <p className="text-xs text-neutral-500 italic mb-2">
        Historia: {historia?.titulo || "Desconocida"}
      </p>

      <div className="flex flex-col gap-2">
        <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            onDelete(chapter.id_Capitulo);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
