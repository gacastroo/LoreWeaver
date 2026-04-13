import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";
import TagCard from "@/components/tag/TagCard";
import CreateTagModal from "@/components/ui/CreateTagModal";
import { useApp } from "@/context/AppContext";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [filtroTag] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const fetchTags = async () => {
    try {
      const res = await API.get("/tags");
      setTags(res.data);
    } catch (error) {
      console.error("❌ Error al cargar tags:", error);
    }
  };

  useEffect(() => { fetchTags(); }, []);

  const filteredTags = filtroTag
    ? tags.filter((tg) => tg.id_Tag === parseInt(filtroTag))
    : tags;

  return (
    <div className={`p-8 min-h-full ${isLight ? "bg-white" : "bg-zinc-950"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${isLight ? "text-neutral-800" : "text-gray-100"}`}>{t.tituloTags}</h1>
        <AddButton onClick={() => setModalOpen(true)} label={t.nuevoTagBtn} />
      </div>

      {filteredTags.length === 0 ? (
        <p className={`text-sm ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{t.noTags}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTags.map((tag) => (
            <TagCard key={tag.id_Tag} tag={tag} onDelete={fetchTags} />
          ))}
        </div>
      )}

      {modalOpen && (
        <CreateTagModal
          onClose={() => setModalOpen(false)}
          onSuccess={(newTag) => setTags((prev) => [...prev, newTag])}
          endpoint="/tags"
          label="Tag"
        />
      )}
    </div>
  );
}
