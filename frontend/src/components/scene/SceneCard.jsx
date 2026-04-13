import { useState } from "react";
import DeleteButton from "@/components/ui/button/DeleteButton";
import DeleteConfirmModal from "@/components/ui/deletemodal";
import { useApp } from "@/context/AppContext";

export default function SceneCard({ escena, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  return (
    <div className={`border rounded-lg shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
      <div>
        <h2 className="font-semibold text-indigo-500 mb-1">{escena.titulo_escena}</h2>
        <p className={`text-sm ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>
          <strong>{t.capituloLabel}</strong> {escena.capitulo?.titulo_capitulo || "—"}
        </p>
        <p className={`text-sm ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>
          <strong>{t.historiaLabel}</strong>{" "}
          {escena.capitulo?.historia?.titulo || escena.historia?.titulo || "—"}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <DeleteButton onClick={() => setShowModal(true)} label={t.eliminar} />
      </div>

      {showModal && (
        <DeleteConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => { onDelete(escena.id_Escena); setShowModal(false); }}
        />
      )}
    </div>
  );
}
