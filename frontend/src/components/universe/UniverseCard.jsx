import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import AssignHistoriaModal from "@/components/ui/AssignHistoriaModal";
import API from "@/services/api";
import { useApp } from "@/context/AppContext";

export default function UniverseCard({ universo, historias, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [loadingRemoveHistoria, setLoadingRemoveHistoria] = useState(false);
  const [showAssignHistoriaModal, setShowAssignHistoriaModal] = useState(false);
  const navigate = useNavigate();
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const historia = historias.find((h) => h.id === universo.historiaId);
  const MAX_CARACTERES = 120;
  const descripcionCorta =
    universo.descripcion_universo?.length > MAX_CARACTERES
      ? universo.descripcion_universo.slice(0, MAX_CARACTERES).trimEnd() + "..."
      : universo.descripcion_universo || t.sinDescripcionUniverso;

  const quitarHistoria = async () => {
    if (!universo.historiaId) return;
    setLoadingRemoveHistoria(true);
    try {
      await API.patch(`/universos/${universo.id_Universo}/desasociar-historia`);
      window.location.reload();
    } catch (error) {
      console.error("Error quitando historia del universo:", error);
      setLoadingRemoveHistoria(false);
    }
  };

  return (
    <div className={`rounded-xl shadow border hover:shadow-md transition p-5 ${
      isLight
        ? "bg-gradient-to-br from-white via-neutral-50 to-neutral-100 border-neutral-200"
        : "bg-gradient-to-br from-zinc-800 via-zinc-800 to-zinc-900 border-zinc-700"
    }`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-500 mb-1">{universo.titulo_universo}</h2>
          <p className={`text-sm italic mb-2 ${isLight ? "text-neutral-600" : "text-zinc-400"}`}>{descripcionCorta}</p>

          {historia ? (
            <>
              <p className={`text-sm ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>
                <strong>{t.historiaLabel}</strong> {historia.titulo}
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
            <>
              <p className={`text-sm italic ${isLight ? "text-neutral-400" : "text-zinc-500"}`}>{t.sinHistoriaAsignada}</p>
              <button
                onClick={() => setShowAssignHistoriaModal(true)}
                className="w-40 text-xs px-3 py-1 mt-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
              >
                {t.asignarHistoria}
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <ViewButton onClick={() => navigate(`/universo/${universo.id_Universo}`)} label={t.verMas} />
          <DeleteButton onClick={() => setShowModal(true)} label={t.eliminar} />
        </div>

        {showModal && (
          <DeleteConfirmModal
            onCancel={() => setShowModal(false)}
            onConfirm={() => { onDelete(universo.id_Universo); setShowModal(false); }}
          />
        )}
        {showAssignHistoriaModal && (
          <AssignHistoriaModal
            tipo="universo"
            id={universo.id_Universo}
            onClose={() => setShowAssignHistoriaModal(false)}
            onSuccess={() => window.location.reload()}
          />
        )}
      </div>
    </div>
  );
}
