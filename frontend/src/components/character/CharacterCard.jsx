import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import AssignTagModal from "@/components/ui/AssignTagModal";
import QuitarTagModal from "@/components/ui/QuitarTagModal";
import AssignHistoriaModal from "@/components/ui/AssignHistoriaModal";
import API from "@/services/api";

export default function CharacterCard({ character, onDelete, onTagClick }) {
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveTagModal, setShowRemoveTagModal] = useState(false);
  const [showAssignHistoriaModal, setShowAssignHistoriaModal] = useState(false);
  const [loadingRemoveHistoria, setLoadingRemoveHistoria] = useState(false);
  const navigate = useNavigate();

  const MAX_CARACTERES = 40; // <-- Aquí ajustas el límite

  const cortarDescripcion = (text) => {
    if (!text) return "Sin descripción";
    return text.length > MAX_CARACTERES
      ? text.slice(0, MAX_CARACTERES).trimEnd() + "..."
      : text;
  };

  const quitarHistoria = async () => {
    if (!character.historia) return;
    setLoadingRemoveHistoria(true);
    try {
      await API.patch(`/personajes/${character.id_Personaje}/desasociar-historia`, {
        historiaId: null,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error quitando historia:", error);
      setLoadingRemoveHistoria(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition flex flex-col justify-between h-full">
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-lg font-semibold text-neutral-800">
          {character.nombre_personaje}
        </h2>

        <p className="text-sm text-neutral-600 mt-1 flex-grow">
          {cortarDescripcion(character.descripcion_personaje)}
        </p>

        {character.historia ? (
          <>
            <p className="text-xs text-neutral-500 mt-2">
              Historia: {character.historia.titulo}
            </p>
            <button
              onClick={quitarHistoria}
              disabled={loadingRemoveHistoria}
              className="w-40 text-xs px-3 py-1 mt-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
            >
              {loadingRemoveHistoria ? "Quitando..." : "Quitar historia"}
            </button>
          </>
        ) : (
          <div className="mt-2">
            <p className="text-xs text-neutral-400 italic mb-2">Sin historia asignada</p>
            <button
              onClick={() => setShowAssignHistoriaModal(true)}
              className="w-40 text-xs px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              + Asignar historia
            </button>
          </div>
        )}

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

        <div className="mt-4 flex flex-col gap-2">
          <ViewButton
            onClick={() => navigate(`/personaje/${character.id_Personaje}`)}
            label="Ver más"
          />
          <DeleteButton onClick={() => setShowModal(true)} label="Eliminar" />
          <button
            onClick={() => setShowAssignModal(true)}
            className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded transition"
          >
            + Agregar tag
          </button>
          <button
            onClick={() => setShowRemoveTagModal(true)}
            className="text-sm px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded transition"
          >
            - Quitar tag
          </button>
        </div>
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            onDelete(character.id_Personaje);
            setShowModal(false);
          }}
        />
      )}

      {showAssignModal && (
        <AssignTagModal
          personajeId={character.id_Personaje}
          tagsAsignados={character.tags.map((pt) => pt.tag)}
          onClose={() => setShowAssignModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}

      {showAssignHistoriaModal && (
        <AssignHistoriaModal
          tipo="personaje"
          id={character.id_Personaje}
          onClose={() => setShowAssignHistoriaModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}

      {showRemoveTagModal && (
        <QuitarTagModal
          personajeId={character.id_Personaje}
          tagsAsignados={character.tags.map((pt) => pt.tag)}
          onClose={() => setShowRemoveTagModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}
