// components/ui/DeleteStoryCascadeModal.jsx
import { Dialog } from "@headlessui/react"

export default function DeleteStoryCascadeModal({ story, onCancel, onConfirm }) {
  return (
    <Dialog open={true} onClose={onCancel} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold text-red-600">
            ¿Eliminar historia “{story.titulo}”?
          </Dialog.Title>

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p>Esta acción eliminará también:</p>
            <ul className="list-disc list-inside text-gray-600">
              {story.capitulos?.length > 0 && <li>{story.capitulos.length} capítulo(s)</li>}
              {story.escenas?.length > 0 && <li>{story.escenas.length} escena(s)</li>}
              {story.universos?.length > 0 && <li>{story.universos.length} universo(s)</li>}
              {story.personajes?.length > 0 && <li>{story.personajes.length} personaje(s)</li>}
              {story.tags?.length > 0 && <li>{story.tags.length} tag(s)</li>}
            </ul>
            <p className="mt-2 text-red-500 font-medium">Esta acción es irreversible.</p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">Cancelar</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Eliminar historia
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
