// src/components/ui/DeleteConfirmModal.jsx
export default function DeleteConfirmModal({ onCancel, onConfirm }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">¿Estás seguro?</h3>
          <p className="text-sm text-neutral-600 mb-6">Esta acción eliminará permanentemente el elemento.</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }
  