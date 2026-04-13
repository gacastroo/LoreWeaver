import { useRef, useState, useEffect } from "react";
import cytoscape from "cytoscape";
import API from "@/services/api";
import { Map } from "lucide-react";
import { useApp } from "@/context/AppContext";

const colores = {
  historia: "#facc15",
  capitulo: "#38bdf8",
  escena: "#a78bfa",
  personaje: "#4ade80",
  tag: "#f87171",
  universo: "#79443b",
};

export default function MapGenerator() {
  const cyRef = useRef(null);
  const containerRef = useRef(null);
  const [filtros, setFiltros] = useState({ historia: true, capitulo: true, escena: true, personaje: true, tag: true, universo: true });
  const [elementosOriginales, setElementosOriginales] = useState([]);
  const [error, setError] = useState("");
  const [layoutType, setLayoutType] = useState("breadthfirst");
  const { theme, t } = useApp();
  const isLight = theme === "light";

  const bg = isLight ? "#f3f4f6" : "#0f172a";
  const pageBg = isLight ? "bg-gray-100" : "bg-zinc-950";
  const textCls = isLight ? "text-neutral-800" : "text-white";
  const selectCls = isLight
    ? "rounded px-3 py-1 bg-white border border-neutral-300 text-neutral-800"
    : "rounded px-3 py-1 bg-zinc-800 border border-zinc-600 text-white";

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
    if (!datos.length) return;
    const visibles = new Set();
    const nodosVisibles = datos.filter((e) => {
      const tipo = e.data?.tipo;
      if (!tipo || filtros[tipo]) { if (e.data?.id) visibles.add(e.data.id); return true; }
      return false;
    });
    const relacionesVisibles = nodosVisibles.filter((e) => {
      if (!e.data?.source || !e.data?.target) return true;
      return visibles.has(e.data.source) && visibles.has(e.data.target);
    });
    if (cyRef.current) cyRef.current.destroy();

    let layoutConfig = {};
    if (layoutType === "breadthfirst") {
      layoutConfig = { name: "breadthfirst", directed: true, spacingFactor: 0.9, padding: 50, animate: true, animationDuration: 600, direction: "TB" };
    } else if (layoutType === "grid") {
      layoutConfig = { name: "grid", spacingFactor: 1, padding: 20, animate: true, animationDuration: 600 };
    } else if (layoutType === "cose") {
      layoutConfig = { name: "cose", padding: 50, animate: true, spacingFactor: 1, animationDuration: 600, idealEdgeLength: 50, nodeOverlap: 10 };
    }

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: relacionesVisibles,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)", shape: "round-rectangle", "text-wrap": "wrap",
            "text-max-width": 160, width: "mapData(label.length, 5, 30, 80, 200)", height: 50,
            padding: 5, "font-size": 11, "text-valign": "center", "text-halign": "center",
            color: "#fff", "text-outline-width": 1, "text-outline-color": "#1f2937",
            "background-color": (ele) => colores[ele.data("tipo")],
          },
        },
        {
          selector: "edge",
          style: {
            width: 3, "line-color": "#9ca3af", "target-arrow-color": "#9ca3af",
            "target-arrow-shape": "triangle", "curve-style": "bezier",
          },
        },
      ],
      layout: layoutConfig,
    });
    cyRef.current.fit(cyRef.current.elements(), 10);
  };

  const generarMapa = async () => {
    const data = await fetchMapa();
    setElementosOriginales(data);
    renderizarMapa(data);
  };

  useEffect(() => {
    if (elementosOriginales.length > 0) renderizarMapa(elementosOriginales);
  }, [filtros, layoutType]);

  const centrarMapa = () => {
    if (!cyRef.current) return;
    cyRef.current.animate({ fit: { eles: cyRef.current.elements(), padding: 10 }, duration: 600 });
  };

  const exportarPNG = () => {
    if (!cyRef.current) return;
    const pngBlob = cyRef.current.png({ full: true, scale: 2, bg });
    const link = document.createElement("a");
    link.download = "mapa-loreweaver.png";
    link.href = pngBlob;
    link.click();
  };

  const cambiarFiltro = (tipo) => setFiltros((prev) => ({ ...prev, [tipo]: !prev[tipo] }));

  return (
    <div className={`min-h-screen p-6 ${pageBg}`}>
      <h1 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${textCls}`}>
        <Map className="w-6 h-6 text-yellow-400" />
        {t.mapTitle}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button onClick={generarMapa} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
          {t.generarMapa}
        </button>
        <button onClick={centrarMapa} className={`px-4 py-2 rounded transition ${isLight ? "bg-slate-200 text-neutral-800 hover:bg-slate-300" : "bg-slate-600 text-white hover:bg-slate-500"}`}>
          {t.centrarMapa}
        </button>
        <button onClick={exportarPNG} className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-500 transition">
          {t.exportarPNG}
        </button>
      </div>

      <div className="mb-6">
        <label className={`mr-4 ${textCls}`}>{t.layoutLabel}</label>
        <select value={layoutType} onChange={(e) => setLayoutType(e.target.value)} className={selectCls}>
          <option value="breadthfirst">{t.breadthfirstLabel}</option>
          <option value="grid">{t.gridLabel}</option>
          <option value="cose">{t.coseLabel}</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        {Object.entries(filtros).map(([tipo, activo]) => (
          <label key={tipo} className={`flex items-center gap-2 text-sm capitalize cursor-pointer ${textCls}`}>
            <input type="checkbox" checked={activo} onChange={() => cambiarFiltro(tipo)} className="accent-indigo-500" />
            {tipo}
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div
        ref={containerRef}
        style={{ width: "100%", height: "600px", backgroundColor: bg }}
        className="rounded shadow"
      />

      <div className={`mt-6 text-sm ${textCls}`}>
        <h3 className="font-semibold mb-2">{t.leyenda}</h3>
        <div className="flex flex-wrap gap-4">
          <span className="text-yellow-400">{t.historias}</span>
          <span className="text-sky-400">{t.capitulos}</span>
          <span className="text-purple-400">{t.escenas}</span>
          <span className="text-green-400">{t.personajes}</span>
          <span className="text-red-400">{t.tags}</span>
          <span className="text-orange-700">{t.universos}</span>
        </div>
      </div>
    </div>
  );
}
