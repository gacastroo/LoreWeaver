  import { Eye, Trash2 } from "lucide-react";
  import ViewButton from "@/components/ui/button/ViewButton";
import DeleteButton from "@/components/ui/button/DeleteButton";

  export default function CharacterCard({ character, onDelete }) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-neutral-800">{character.name}</h2>
          <p className="text-sm text-neutral-600 mt-1">{character.description}</p>

          <div className="mt-4 flex flex-col gap-2">
            <ViewButton />
            <DeleteButton onClick={() => onDelete(character.id)} />


          </div>
        </div>
      </div>
    );
  }
