// src/components/ui/DeleteConfirmModal.jsx
import AccessibleModal from "@/components/ui/AccessibleModal";

export default function DeleteConfirmModal({ onCancel, onConfirm }) {
  return (
    <AccessibleModal title="¿Estás seguro?" onClose={onCancel}>
      <p className="text-sm text-neutral-600 mb-6">Esta acción eliminará permanentemente el elemento.</p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Eliminar
        </button>
      </div>
    </AccessibleModal>
  );
}
