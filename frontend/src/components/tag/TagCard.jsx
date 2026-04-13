import { useState } from "react";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import API from "@/services/api";
import { useApp } from "@/context/AppContext";

export default function TagCard({ tag, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const handleDelete = async () => {
    try {
      await API.delete(`/tags/${tag.id_Tag}`);
      if (typeof onDelete === "function") {
        onDelete();
      }
    } catch (err) {
      console.error("❌ Error al eliminar tag:", err);
    }
  };

  return (
    <div className={`border rounded-lg shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
      <div>
        <h2 className="text-lg font-bold text-indigo-500 mb-2">#{tag.nombre_tag}</h2>

        {tag.personajes?.length > 0 ? (
          <ul className={`text-sm list-disc list-inside space-y-1 ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>
            {tag.personajes.map((pt, idx) => (
              <li key={idx}>{pt.personaje?.nombre_personaje}</li>
            ))}
          </ul>
        ) : (
          <p className={`text-sm italic ${isLight ? "text-neutral-500" : "text-zinc-500"}`}>{t.sinPersonajesTag}</p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <DeleteButton onClick={() => setShowModal(true)} label={t.eliminar} />
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => { handleDelete(); setShowModal(false); }}
        />
      )}
    </div>
  );
}
