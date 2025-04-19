import { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
    const filtrados = datos.filter((e) => {
      const tipo = e.data?.tipo;
      return !tipo || filtros[tipo];
    });

    if (cyRef.current) cyRef.current.destroy();

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: filtrados,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            shape: "rectangle",
            width: "label",
            height: "label",
            padding: "10px",
            "font-size": "10px",
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
      },
    });

    cyRef.current.fit(null, 80);
  };

  const generarMapa = async () => {
    const elements = await fetchMapa();
    setElementosOriginales(elements);
    renderizarMapa(elements);
  };

  const organizarMapa = () => {
    if (!cyRef.current) return;
    cyRef.current.layout({
      name: "breadthfirst",
      directed: true,
      spacingFactor: 1.5,
      padding: 40,
    }).run();

    cyRef.current.animate({
      fit: { eles: cyRef.current.elements(), padding: 80 },
      duration: 600,
    });
  };

  const exportarPNG = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current);
    const link = document.createElement("a");
    link.download = "mapa-loreweaver.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportarPDF = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("mapa-loreweaver.pdf");
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

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button onClick={generarMapa} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Generar Mapa
        </button>
        <button onClick={organizarMapa} className="bg-slate-600 px-4 py-2 rounded hover:bg-slate-500">
          Organizar Mapa
        </button>
        <button onClick={exportarPNG} className="bg-green-600 px-4 py-2 rounded hover:bg-green-500">
          Exportar PNG
        </button>
        <button onClick={exportarPDF} className="bg-rose-600 px-4 py-2 rounded hover:bg-rose-500">
          Exportar PDF
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-4">
        {Object.keys(filtros).map((tipo) => (
          <label key={tipo} className="flex items-center gap-2 text-sm capitalize">
            <input
              type="checkbox"
              checked={filtros[tipo]}
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
        style={{ width: "100%", height: "600px" }}
        className="bg-gray-800 rounded shadow"
      />

      {/* Leyenda horizontal */}
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
