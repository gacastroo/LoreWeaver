import { useState } from "react";
import { Eye } from "lucide-react";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function CharacterCard({ character, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-neutral-800">{character.name}</h2>
        <p className="text-sm text-neutral-600 mt-1">{character.description}</p>

        <div className="mt-4 flex flex-col gap-2">
          <ViewButton label="Ver más" />
          <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
        </div>

        {showModal && (
          <DeleteConfirmModal
            onCancel={() => setShowModal(false)}
            onConfirm={() => {
              onDelete(character.id);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
