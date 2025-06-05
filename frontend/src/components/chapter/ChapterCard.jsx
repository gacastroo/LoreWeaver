import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import ViewButton from "@/components/ui/button/ViewButton";

export default function ChapterCard({ chapter, historia, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold text-indigo-700">{chapter.titulo_capitulo}</h2>
        <p className="text-xs text-neutral-500 italic mb-2">
          Historia: {historia?.titulo || "Desconocida"}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
      <ViewButton
        label="Ver más"
        onClick={() => navigate(`/editor-capitulo/${chapter.id_Capitulo}`)}
      />

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
