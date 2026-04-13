import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import AssignTagModal from "@/components/ui/AssignTagModal";
import QuitarTagModal from "@/components/ui/QuitarTagModal";
import AssignHistoriaModal from "@/components/ui/AssignHistoriaModal";
import API from "@/services/api";
import { useApp } from "@/context/AppContext";

export default function CharacterCard({ character, onDelete, onTagClick }) {
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRemoveTagModal, setShowRemoveTagModal] = useState(false);
  const [showAssignHistoriaModal, setShowAssignHistoriaModal] = useState(false);
  const [loadingRemoveHistoria, setLoadingRemoveHistoria] = useState(false);
  const navigate = useNavigate();
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const MAX_CARACTERES = 40;
  const cortarDescripcion = (text) => {
    if (!text) return t.sinDescripcion;
    return text.length > MAX_CARACTERES ? text.slice(0, MAX_CARACTERES).trimEnd() + "..." : text;
  };

  const quitarHistoria = async () => {
    if (!character.historia) return;
    setLoadingRemoveHistoria(true);
    try {
      await API.patch(`/personajes/${character.id_Personaje}/desasociar-historia`, { historiaId: null });
      window.location.reload();
    } catch (error) {
      console.error("Error quitando historia:", error);
      setLoadingRemoveHistoria(false);
    }
  };

  return (
    <div className={`rounded-lg shadow-sm border hover:shadow-md transition flex flex-col justify-between h-full ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
      <div className="p-4 flex flex-col h-full">
        <h2 className={`text-lg font-semibold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>
          {character.nombre_personaje}
        </h2>

        <p className={`text-sm mt-1 flex-grow ${isLight ? "text-neutral-600" : "text-zinc-400"}`}>
          {cortarDescripcion(character.descripcion_personaje)}
        </p>

        {character.historia ? (
          <>
            <p className={`text-xs mt-2 ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>
              {t.historiaLabel} {character.historia.titulo}
            </p>
            <button
              onClick={quitarHistoria}
              disabled={loadingRemoveHistoria}
              className="w-40 text-xs px-3 py-1 mt-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
            >
              {loadingRemoveHistoria ? t.quitando : t.quitarHistoriaBtn}
            </button>
          </>
        ) : (
          <div className="mt-2">
            <p className={`text-xs italic mb-2 ${isLight ? "text-neutral-400" : "text-zinc-500"}`}>{t.sinHistoriaAsignada}</p>
            <button
              onClick={() => setShowAssignHistoriaModal(true)}
              className="w-40 text-xs px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              {t.asignarHistoria}
            </button>
          </div>
        )}

        <div className="mt-2 min-h-[2.5rem] flex flex-wrap gap-2 items-start">
          {character.tags?.length > 0 ? (
            character.tags.map((pt, index) => (
              <button
                key={index}
                onClick={() => onTagClick?.(pt.tag?.nombre_tag)}
                className={`text-xs font-medium px-2 py-1 rounded-full transition ${isLight ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200" : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"}`}
              >
                #{pt.tag?.nombre_tag}
              </button>
            ))
          ) : (
            <span className={`text-xs italic ${isLight ? "text-neutral-400" : "text-zinc-500"}`}>{t.sinEtiquetas}</span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <ViewButton onClick={() => navigate(`/personaje/${character.id_Personaje}`)} label={t.verMas} />
          <DeleteButton onClick={() => setShowModal(true)} label={t.eliminar} />
          <button
            onClick={() => setShowAssignModal(true)}
            className={`text-sm px-4 py-2 rounded transition ${isLight ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" : "bg-indigo-900 text-indigo-300 hover:bg-indigo-800"}`}
          >
            {t.agregarTag}
          </button>
          <button
            onClick={() => setShowRemoveTagModal(true)}
            className={`text-sm px-4 py-2 rounded transition ${isLight ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-red-900 text-red-300 hover:bg-red-800"}`}
          >
            {t.quitarTagBtn}
          </button>
        </div>
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => { onDelete(character.id_Personaje); setShowModal(false); }}
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
