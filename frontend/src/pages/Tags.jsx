import { useEffect, useState } from "react";
import API from "@/services/api";
import AddButton from "@/components/ui/button/AddButton";
import TagCard from "@/components/tag/TagCard";
import Select from "@/components/ui/input/Select";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [filtroTag, setFiltroTag] = useState("");

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
    console.log("➕ Abrir modal para nuevo tag");
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

      <div className="mb-6 w-64">
        <Select
          label="Filtrar por tag"
          value={filtroTag}
          onChange={(e) => setFiltroTag(e.target.value)}
          options={[
            { value: "", label: "Todos los tags" },
            ...tags.map((t) => ({
              value: t.id_Tag.toString(),
              label: t.nombre_tag,
            })),
          ]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTags.map((tag) => (
          <TagCard key={tag.id_Tag} tag={tag} onDelete={fetchTags} />
        ))}
      </div>
    </div>
  );
}
