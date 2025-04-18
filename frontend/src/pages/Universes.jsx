import { useEffect, useState } from "react";
import API from "@/services/api";
import UniverseCard from "@/components/universe/UniverseCard";
import AddButton from "@/components/ui/button/AddButton";
import Select from "@/components/ui/input/Select";

export default function Universes() {
  const [universos, setUniversos] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [filtroHistoria, setFiltroHistoria] = useState("");

  const fetchData = async () => {
    try {
      const [uniRes, hisRes] = await Promise.all([
        API.get("/universos"),
        API.get("/historias")
      ]);
      setUniversos(uniRes.data);
      setHistorias(hisRes.data);
    } catch (error) {
      console.error("❌ Error al cargar universos o historias:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const universosFiltrados = filtroHistoria
    ? universos.filter((u) => u.historiaId === parseInt(filtroHistoria))
    : universos;

  const handleAdd = () => {
    console.log("Abrir modal para nuevo universo");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Universos</h1>
        <AddButton onClick={handleAdd} label="Nuevo universo" />
      </div>

      <div className="mb-6 w-64">
        <Select
          label="Filtrar por historia"
          value={filtroHistoria}
          onChange={(e) => setFiltroHistoria(e.target.value)}
          options={[
            { value: "", label: "Todas las historias" },
            ...historias.map((h) => ({
              value: h.id.toString(),
              label: h.titulo,
            })),
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universosFiltrados.map((uni) => (
          <UniverseCard key={uni.id_Universo} universo={uni} historias={historias} />
        ))}
      </div>
    </div>
  );
}
