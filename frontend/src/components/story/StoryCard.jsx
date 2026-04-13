import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteStoryCascadeModal from "@/components/ui/DeleteStoryCascadeModal";
import AsociarPersonajeModal from "@/components/ui/AsociarPersonajeModal";
import AsociarUniversoModal from "@/components/ui/AsociarUniversoModal";
import { useApp } from "@/context/AppContext";

export default function StoryCard({ story, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [abrirAsociarModal, setAbrirAsociarModal] = useState(false);
  const [abrirAsociarUniversoModal, setAbrirAsociarUniversoModal] = useState(false);
  const navigate = useNavigate();
  const { theme, t } = useApp();
  const isLight = theme === "light";

  return (
    <div className={`rounded-xl shadow border hover:shadow-md transition p-5 ${
      isLight
        ? "bg-gradient-to-br from-white via-neutral-50 to-neutral-100 border-neutral-200"
        : "bg-gradient-to-br from-zinc-800 via-zinc-800 to-zinc-900 border-zinc-700"
    }`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-500 mb-1">{story.titulo}</h2>
          {story.updatedAt && (
            <p className={`text-xs mb-4 ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>
              {t.ultimaEdicion}{" "}
              {new Date(story.updatedAt).toLocaleDateString("es-ES", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          )}
          <div className={`text-sm space-y-1 ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>
            <p><strong>{t.personajes}:</strong> {story.personajes?.map(p => p.nombre_personaje).join(", ") || t.ninguno}</p>
            <p><strong>{t.universos}:</strong> {story.universos?.map(u => u.titulo_universo).join(", ") || t.ninguno}</p>
            <p><strong>{t.capitulos}:</strong> {story.capitulos?.map(c => c.titulo_capitulo).join(", ") || t.ninguno}</p>
            <p><strong>{t.escenas}:</strong> {story.escenas?.map(e => e.titulo_escena).join(", ") || t.ninguno}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <ViewButton onClick={() => navigate(`/historia/${story.id}`)} label={t.verMas} />
          <button
            onClick={() => setAbrirAsociarModal(true)}
            className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md transition"
          >
            {t.asociarPersonaje}
          </button>
          <button
            onClick={() => setAbrirAsociarUniversoModal(true)}
            className="px-4 py-2 text-sm text-white bg-sky-600 hover:bg-sky-700 rounded-md transition"
          >
            {t.asociarUniverso}
          </button>
          <DeleteButton onClick={() => setShowModal(true)} label={t.eliminar} />
        </div>

        {showModal && (
          <DeleteStoryCascadeModal
            story={story}
            onCancel={() => setShowModal(false)}
            onConfirm={() => { onDelete(story.id); setShowModal(false); }}
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
