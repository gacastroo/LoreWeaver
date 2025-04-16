import { useEffect, useState } from "react";
import StoryCard from "@/components/story/StoryCard";
import AddButton from "@/components/ui/button/AddButton";

export default function Historias() {
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    // Aquí conectarás con tu backend
    setHistorias([
      { id: 1, title: "El Reino Perdido", description: "Una historia épica de redención." },
      { id: 2, title: "Sueños de Acero", description: "Distopía entre máquinas y humanidad." },
    ]);
  }, []);

  const handleEliminar = (id) => {
    setHistorias(prev => prev.filter(h => h.id !== id));
  };

  const handleAdd = () => {
    console.log("Abrir modal para nueva historia");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800">Historias</h1>
        <AddButton onClick={handleAdd} label="Nueva historia" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {historias.map((story) => (
          <StoryCard key={story.id} story={story} onDelete={handleEliminar} />
        ))}
      </div>
    </div>
  );
}
