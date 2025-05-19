  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import ViewButton from "@/components/ui/button/ViewButton";
  import DeleteButton from "@/components/ui/button/DeleteButton";
  import DeleteConfirmModal from "@/components/ui/deletemodal";
  import API from "@/services/api";
  import AsociarPersonajeModal from "@/components/ui/AsociarPersonajeModal";
  import AsociarUniversoModal from "@/components/ui/AsociarUniversoModal";

  export default function StoryCard({ story, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [abrirAsociarModal, setAbrirAsociarModal] = useState(false);
    const [abrirAsociarUniversoModal, setAbrirAsociarUniversoModal] = useState(false);
    const navigate = useNavigate();

    return (
      <div className="bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-xl shadow border border-neutral-200 hover:shadow-md transition p-5">
        <div className="flex flex-col h-full justify-between">
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

            <div className="text-sm text-neutral-700 space-y-1">
              <p><strong>Personajes:</strong> {story.personajes?.map(p => p.nombre_personaje).join(", ") || "Ninguno"}</p>
              <p><strong>Universos:</strong> {story.universos?.map(u => u.titulo_universo).join(", ") || "Ninguno"}</p>
              <p><strong>Capítulos:</strong> {story.capitulos?.map(c => c.titulo_capitulo).join(", ") || "Ninguno"}</p>
              <p><strong>Escenas:</strong> {story.escenas?.map(e => e.titulo_escena).join(", ") || "Ninguno"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <ViewButton onClick={() => navigate(`/historia/${story.id}`)} label="Ver más" />
            <button
              onClick={() => setAbrirAsociarModal(true)}
              className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md transition"
            >
              Asociar personaje existente
            </button>

            <button
              onClick={() => setAbrirAsociarUniversoModal(true)}
              className="px-4 py-2 text-sm text-white bg-sky-600 hover:bg-sky-700 rounded-md transition"
            >
              Asociar universo existente
            </button>

            <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
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

          {abrirAsociarModal && (
            <AsociarPersonajeModal
              historiaId={story.id}
              onClose={() => setAbrirAsociarModal(false)}
              onSuccess={() => window.location.reload()}
            />
          )}

          {abrirAsociarUniversoModal && (
            <AsociarUniversoModal
              historiaId={story.id}
              onClose={() => setAbrirAsociarUniversoModal(false)}
              onSuccess={() => window.location.reload()}
            />
          )}
        </div>
      </div>
    );
  }
