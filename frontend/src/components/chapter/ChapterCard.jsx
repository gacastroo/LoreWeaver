import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import ViewButton from "@/components/ui/button/ViewButton";
import { useApp } from "@/context/AppContext";

export default function ChapterCard({ chapter, historia, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { theme, t } = useApp();
  const isLight = theme === "light";

  return (
    <div className={`rounded-lg shadow-sm border p-4 hover:shadow-md transition flex flex-col justify-between h-full ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
      <div>
        <h2 className="text-lg font-semibold text-indigo-500">{chapter.titulo_capitulo}</h2>
        <p className={`text-xs italic mb-2 ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>
          {t.historiaLabel} {historia?.titulo || t.historiaDesconocida}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <ViewButton label={t.verMas} onClick={() => navigate(`/editor-capitulo/${chapter.id_Capitulo}`)} />
        <DeleteButton onClick={() => setShowModal(true)} label={t.eliminar} />
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => { onDelete(chapter.id_Capitulo); setShowModal(false); }}
        />
      )}
    </div>
  );
}
