import { useState } from "react";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import API from "@/services/api";

export default function TagCard({ tag, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await API.delete(`/tags/${tag.id_Tag}`);
      onDelete(); // recargar lista desde el padre
    } catch (err) {
      console.error("❌ Error al eliminar tag:", err);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-indigo-700 mb-2">
          #{tag.nombre_tag}
        </h2>

        {tag.personajes?.length > 0 ? (
          <ul className="text-sm text-neutral-700 list-disc list-inside space-y-1">
            {tag.personajes.map((pt, idx) => (
              <li key={idx}>{pt.personaje?.nombre_personaje}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500 italic">Sin personajes</p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            handleDelete();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
