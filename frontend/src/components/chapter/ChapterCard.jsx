import { useState } from "react";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function ChapterCard({ chapter, historia, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-neutral-200 dark:border-zinc-700 p-4 hover:shadow-md transition w-full">
      <h2 className="text-base sm:text-lg font-semibold text-indigo-700 dark:text-indigo-400 break-words">
        {chapter.titulo_capitulo}
      </h2>

      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 italic mb-3 break-words">
        Historia: {historia?.titulo || "Desconocida"}
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
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
