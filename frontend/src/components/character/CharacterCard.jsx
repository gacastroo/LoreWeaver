import { useState } from "react";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import AssignTagModal from "@/components/ui/AssignTagModal";

export default function CharacterCard({ character, onDelete, onTagClick }) {
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition flex flex-col justify-between h-full">
      <div className="p-4 flex flex-col h-full">
        {/* Nombre y descripción */}
        <h2 className="text-lg font-semibold text-neutral-800">
          {character.nombre_personaje}
        </h2>
        <p className="text-sm text-neutral-600 mt-1 flex-grow">
          {character.descripcion_personaje || "Sin descripción"}
        </p>

        {/* Historia */}
        {character.historia && (
          <p className="text-xs text-neutral-500 mt-2">
            Historia: {character.historia.titulo}
          </p>
        )}

        {/* Tags */}
        <div className="mt-2 min-h-[2.5rem] flex flex-wrap gap-2 items-start">
          {character.tags?.length > 0 ? (
            character.tags.map((pt, index) => (
              <button
                key={index}
                onClick={() => onTagClick?.(pt.tag?.nombre_tag)}
                className="bg-neutral-100 text-neutral-700 text-xs font-medium px-2 py-1 rounded-full hover:bg-neutral-200 transition"
              >
                #{pt.tag?.nombre_tag}
              </button>
            ))
          ) : (
            <span className="text-xs text-neutral-400 italic">Sin etiquetas</span>
          )}
        </div>

        {/* Botones */}
        <div className="mt-4 flex flex-col gap-2">
          <ViewButton label="Ver más" />
          <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
          <button
            onClick={() => setShowAssignModal(true)}
            className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded transition"
          >
            + Agregar tag
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            onDelete(character.id_Personaje);
            setShowModal(false);
          }}
        />
      )}

      {/* Modal de asignar tag */}
      {showAssignModal && (
        <AssignTagModal
          personajeId={character.id_Personaje}
          tagsAsignados={character.tags.map((pt) => pt.tag)}
          onClose={() => setShowAssignModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}
