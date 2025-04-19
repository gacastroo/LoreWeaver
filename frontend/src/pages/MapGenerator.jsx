import { useRef, useState, useEffect } from "react";
import cytoscape from "cytoscape";
import html2canvas from "html2canvas";
import API from "@/services/api";

const colores = {
  historia: "#facc15",
  capitulo: "#38bdf8",
  escena: "#a78bfa",
  personaje: "#4ade80",
  tag: "#f87171",
};

export default function MapGenerator() {
  const cyRef = useRef(null);
  const containerRef = useRef(null);
  const [filtros, setFiltros] = useState({
    historia: true,
    capitulo: true,
    escena: true,
    personaje: true,
    tag: true,
  });
  const [elementosOriginales, setElementosOriginales] = useState([]);
  const [error, setError] = useState("");

  const fetchMapa = async () => {
    setError("");
    try {
      const res = await API.get("/mapa");
      return res.data;
    } catch (err) {
      console.error("❌ Error al obtener datos del mapa:", err);
      setError("Error al obtener datos del mapa.");
      return [];
    }
  };

  const renderizarMapa = (datos) => {
    const visibles = new Set();
    const nodosVisibles = datos.filter((e) => {
      const tipo = e.data?.tipo;
      if (!tipo || filtros[tipo]) {
        if (e.data?.id) visibles.add(e.data.id);
        return true;
      }
      return false;
    });

    const relacionesVisibles = nodosVisibles.filter((e) => {
      if (!e.data?.source || !e.data?.target) return true;
      return visibles.has(e.data.source) && visibles.has(e.data.target);
    });

    if (cyRef.current) cyRef.current.destroy();

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: relacionesVisibles,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            shape: "round-rectangle",
            "text-wrap": "wrap",
            "text-max-width": 160,
            width: "mapData(label.length, 5, 30, 80, 200)", // no deprecado
            height: 50,
            padding: 10,
            "font-size": 11,
            "text-valign": "center",
            "text-halign": "center",
            color: "#fff",
            "text-outline-width": 1,
            "text-outline-color": "#1f2937",
            "background-color": (ele) => colores[ele.data("tipo")],
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#9ca3af",
            "target-arrow-color": "#9ca3af",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
      layout: {
        name: "breadthfirst",
        directed: true,
        spacingFactor: 1.5,
        padding: 40,
        animate: true,
        animationDuration: 600,
      },
    });

    cyRef.current.fit(cyRef.current.elements(), 80);
  };

  const generarMapa = async () => {
    const data = await fetchMapa();
    setElementosOriginales(data);
    renderizarMapa(data);
  };

  const centrarMapa = () => {
    if (!cyRef.current) return;
    cyRef.current.animate({
      fit: { eles: cyRef.current.elements(), padding: 80 },
      duration: 600,
    });
  };
  
  const exportarPNG = async () => {
    if (!cyRef.current) return;
  
    const pngBlob = cyRef.current.png({
      full: true,
      scale: 2,
      bg: "#0f172a", // fondo uniforme
    });
  
    const link = document.createElement("a");
    link.download = "mapa-loreweaver.png";
    link.href = pngBlob;
    link.click();
  };
  
  
  

  const cambiarFiltro = (tipo) => {
    setFiltros((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  useEffect(() => {
    if (elementosOriginales.length > 0) {
      renderizarMapa(elementosOriginales);
    }
  }, [filtros]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Generador de Mapa Narrativo</h1>

      {/* Botones */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={generarMapa}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Generar Mapa
        </button>
        <button
          onClick={centrarMapa}
          className="bg-slate-600 px-4 py-2 rounded hover:bg-slate-500"
        >
          Centrar Mapa
        </button>
        <button
          onClick={exportarPNG}
          className="bg-rose-600 px-4 py-2 rounded hover:bg-rose-500"
        >
          Exportar PNG
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-4">
        {Object.entries(filtros).map(([tipo, activo]) => (
          <label key={tipo} className="flex items-center gap-2 text-sm capitalize">
            <input
              type="checkbox"
              checked={activo}
              onChange={() => cambiarFiltro(tipo)}
              className="accent-indigo-500"
            />
            {tipo}
          </label>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <div
        ref={containerRef}
        style={{
            width: "100%",
            height: "600px",
            backgroundColor: "#0f172a", // Forzado también aquí
        }}
        className="rounded shadow"
        />



      {/* Leyenda */}
      <div className="mt-6 text-sm">
        <h3 className="font-semibold mb-2">Leyenda:</h3>
        <div className="flex flex-wrap gap-4">
          <span className="text-yellow-400">Historia</span>
          <span className="text-sky-400">Capítulo</span>
          <span className="text-purple-400">Escena</span>
          <span className="text-green-400">Personaje</span>
          <span className="text-red-400">Tag</span>
        </div>
      </div>
    </div>
  );
}
