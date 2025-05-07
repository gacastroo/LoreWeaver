import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";
import TagCard from "@/components/tag/TagCard";
import CreateTagModal from "@/components/ui/CreateTagModal";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [filtroTag] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [historiaId] = useState(1); // Asumimos que la historiaId es 1, puedes cambiarlo dinámicamente según el contexto.

  const fetchTags = async () => {
    try {
      const res = await API.get("/tags");
      setTags(res.data);
    } catch (error) {
      console.error("❌ Error al cargar tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAdd = () => {
    setModalOpen(true);
  };

  const handleSuccess = (newTag) => {
    setTags((prevTags) => [...prevTags, newTag]);
  };

  const filteredTags = filtroTag
    ? tags.filter((t) => t.id_Tag === parseInt(filtroTag))
    : tags;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Tags</h1>
        <AddButton onClick={handleAdd} label="Nuevo tag" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTags.map((tag) => (
          <TagCard key={tag.id_Tag} tag={tag} />
        ))}
      </div>

      {modalOpen && (
        <CreateTagModal
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
          endpoint="/tags"
          label="Tag"
          historiaId={historiaId}
        />
      )}

    </div>
  );
}
