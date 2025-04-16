// src/components/story/StoryCard.jsx
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import ViewCharacterButton from "@/components/ui/button/ViewButton";
import DeleteCharacterButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function StoryCard({ story, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-xl shadow border border-neutral-200 hover:shadow-md transition p-5">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-700 mb-1">{story.title}</h2>
          <p className="text-sm text-neutral-600 italic mb-4">{story.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <ViewCharacterButton label="Ver historia" />
          <DeleteCharacterButton onClick={() => setShowModal(true)} label="Eliminar" />
        </div>

        {showModal && (
          <DeleteConfirmModal
            onCancel={() => setShowModal(false)}
            onConfirm={() => {
              onDelete(story.id);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}