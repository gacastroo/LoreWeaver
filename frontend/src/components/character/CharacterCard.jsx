import { useState } from "react";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function CharacterCard({ character, onDelete, onTagClick }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition">
      <div className="p-4">
        {/* Nombre y descripción */}
        <h2 className="text-lg font-semibold text-neutral-800">
          {character.nombre_personaje}
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          {character.descripcion_personaje || "Sin descripción"}
        </p>

        {/* Mostrar historia si viene incluida */}
        {character.historia && (
          <p className="text-xs text-neutral-500 mt-2">
            Historia: {character.historia.titulo}
          </p>
        )}

        {/* Mostrar tags */}
        {character.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {character.tags.map((pt, index) => (
              <button
                key={index}
                onClick={() => onTagClick?.(pt.tag?.nombre_tag)}
                className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full hover:bg-indigo-200 transition"
              >
                #{pt.tag?.nombre_tag}
              </button>
            ))}
          </div>
        )}

        {/* Botones */}
        <div className="mt-4 flex flex-col gap-2">
          <ViewButton label="Ver más" />
          <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
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
      </div>
    </div>
  );
}
