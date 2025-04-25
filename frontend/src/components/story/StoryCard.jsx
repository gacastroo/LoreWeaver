import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 IMPORTANTE
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";

export default function StoryCard({ story, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // 👈 Hook para navegar

  return (
    <div className="bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-xl shadow border border-neutral-200 hover:shadow-md transition p-5">
      <div className="flex flex-col h-full justify-between">
        {/* Título y descripción */}
        <div>
          <h2 className="text-xl font-bold text-indigo-700 mb-1">{story.titulo}</h2>
          {story.updatedAt && (
            <p className="text-xs text-neutral-500 mb-4">
              Última edición:{" "}
              {new Date(story.updatedAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          {/* Listado de elementos relacionados */}
          <div className="text-sm text-neutral-700 space-y-1">
            <p><strong>Personajes:</strong> {story.personajes?.map(p => p.nombre_personaje).join(", ") || "Ninguno"}</p>
            <p><strong>Universos:</strong> {story.universos?.map(u => u.titulo_universo).join(", ") || "Ninguno"}</p>
            <p><strong>Capítulos:</strong> {story.capitulos?.map(c => c.titulo_capitulo).join(", ") || "Ninguno"}</p>
            <p><strong>Escenas:</strong> {story.escenas?.map(c => c.titulo_escena).join(", ") || "Ninguno"}</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-2 mt-4">
          <ViewButton 
            label="Ver historia" 
            onClick={() => navigate(`/historia/${story.id}`)}
          />
          <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
        </div>

        {/* Modal de confirmación */}
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
