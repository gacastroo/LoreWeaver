import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { useApp } from "@/context/AppContext";

export default function EditorHistoria({ onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [capitulos, setCapitulos] = useState([]);
  const [capitulosOriginales, setCapitulosOriginales] = useState([]);
  const [expandido, setExpandido] = useState([]);
  const [loading, setLoading] = useState(true);
  const textareaRefs = useRef([]);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const res = await API.get(`/historias/${id}`);
        setTitulo(res.data.titulo || "");
        setCapitulos(res.data.capitulos || []);
        setCapitulosOriginales(res.data.capitulos || []);
        setExpandido(res.data.capitulos?.map(() => true) || []);
      } catch (error) {
        console.error("❌ Error al cargar historia:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistoria();
  }, [id]);

  useLayoutEffect(() => {
    capitulos.forEach((_, i) => ajustarAlturaTextarea(i));
  }, [capitulos]);

  const ajustarAlturaTextarea = (index) => {
    const ta = textareaRefs.current[index];
    if (ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }
  };

  const toggleExpandido = (index) => {
    setExpandido((prev) => prev.map((val, i) => (i === index ? !val : val)));
    setTimeout(() => ajustarAlturaTextarea(index), 0);
  };

  const handleChangeContenido = (index, value) => {
    setCapitulos((prev) => prev.map((cap, i) => (i === index ? { ...cap, contenido: value } : cap)));
    ajustarAlturaTextarea(index);
  };

  const handleChangeTituloCapitulo = (index, value) => {
    setCapitulos((prev) => prev.map((cap, i) => (i === index ? { ...cap, titulo_capitulo: value } : cap)));
  };

  const agregarCapitulo = () => {
    setCapitulos((prev) => [...prev, { titulo_capitulo: `Capítulo ${prev.length + 1}`, contenido: "" }]);
    setExpandido((prev) => [...prev, true]);
  };

  const eliminarCapitulo = (index) => {
    setCapitulos((prev) => prev.filter((_, i) => i !== index));
    setExpandido((prev) => prev.filter((_, i) => i !== index));
    textareaRefs.current.splice(index, 1);
  };

  const handleGuardar = async () => {
    try {
      await API.put(`/historias/${id}`, { titulo });
      for (const cap of capitulos) {
        if (cap.id_Capitulo) {
          await API.put(`/capitulos/${cap.id_Capitulo}`, {
            titulo_capitulo: cap.titulo_capitulo,
            contenido: cap.contenido,
          });
        } else {
          await API.post(`/capitulos`, {
            titulo_capitulo: cap.titulo_capitulo,
            contenido: cap.contenido,
            historiaId: parseInt(id),
          });
        }
      }
      setCapitulosOriginales([...capitulos]);
      toast.success("Historia y capítulos actualizados correctamente");
      onUpdate && onUpdate();
      navigate("/stories");
    } catch (error) {
      console.error("❌ Error al guardar historia:", error);
    }
  };

  const handleExportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(titulo, 10, 20);
    let y = 30;
    doc.setFontSize(14);
    capitulos.forEach((cap) => {
      doc.text(`${cap.titulo_capitulo}`, 10, y);
      y += 10;
      doc.setFontSize(12);
      const texto = doc.splitTextToSize(cap.contenido || "", 180);
      if (y + texto.length * 7 > 280) { doc.addPage(); y = 20; }
      doc.text(texto, 10, y);
      y += texto.length * 7;
      doc.setFontSize(14);
    });
    doc.save(`historia_${titulo || "sin_titulo"}.pdf`);
  };

  if (loading) return <p className={`p-6 ${isLight ? "text-neutral-700" : "text-zinc-400"}`}>{t.cargandoHistoria}</p>;

  return (
    <div className={`p-8 max-w-4xl mx-auto space-y-6 min-h-screen ${isLight ? "bg-white" : "bg-zinc-950"}`}>
      <h1 className={`text-2xl font-bold ${isLight ? "text-neutral-700" : "text-gray-100"}`}>{t.editarHistoria}</h1>

      <button
        onClick={() => navigate(`/historia/${id}/relaciones`)}
        className={`text-sm px-4 py-2 rounded hover:bg-blue-200 transition ${isLight ? "bg-blue-100 text-blue-800" : "bg-blue-900 text-blue-300 hover:bg-blue-800"}`}
      >
        {t.verElementosRelacionados}
      </button>

      <label className={`block text-sm font-medium ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>{t.tituloLabel}</label>
      <input
        type="text"
        className={`w-full p-3 border text-lg font-semibold rounded-md mb-4 ${isLight ? "border-neutral-400 bg-white text-neutral-800" : "border-zinc-600 bg-zinc-800 text-gray-100"}`}
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder={t.tituloHistoriaPlaceholder || "Título de la historia"}
      />

      {capitulos.map((cap, index) => (
        <div key={index} className={`border p-4 rounded-md shadow-sm space-y-2 ${isLight ? "bg-white border-neutral-200" : "bg-zinc-800 border-zinc-700"}`}>
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={cap.titulo_capitulo}
              onChange={(e) => handleChangeTituloCapitulo(index, e.target.value)}
              className={`w-full font-semibold text-lg border rounded-md p-2 outline-none ${isLight ? "border-neutral-300 bg-white text-neutral-800" : "border-zinc-600 bg-zinc-700 text-gray-100"}`}
              placeholder={`Capítulo ${index + 1}`}
            />
            <div className="ml-2 flex gap-2">
              <button onClick={() => toggleExpandido(index)} className="text-sm text-blue-400 hover:underline">
                {expandido[index] ? t.minimizar : t.expandir}
              </button>
              {capitulos.length > 1 && (
                <button onClick={() => eliminarCapitulo(index)} className="text-sm text-red-400 hover:underline">
                  {t.eliminar}
                </button>
              )}
            </div>
          </div>

          {expandido[index] && (
            <textarea
              ref={(el) => (textareaRefs.current[index] = el)}
              value={cap.contenido || ""}
              onChange={(e) => handleChangeContenido(index, e.target.value)}
              placeholder={t.contenidoPlaceholder || "Escribe el contenido del capítulo..."}
              className={`w-full p-3 border rounded-md resize-none ${isLight ? "border-neutral-300 bg-neutral-50 text-neutral-800" : "border-zinc-600 bg-zinc-700 text-zinc-200"}`}
              style={{ minHeight: "150px", overflow: "hidden" }}
            />
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <button
          onClick={agregarCapitulo}
          className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition ${isLight ? "bg-gray-200 text-neutral-800 hover:bg-gray-300" : "bg-zinc-700 text-gray-200 hover:bg-zinc-600"}`}
        >
          {t.aniadirCapitulo}
        </button>
        <div className="flex gap-4">
          <button onClick={handleGuardar} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
            {t.guardarCambios}
          </button>
          <button onClick={handleExportarPDF} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            {t.exportarPDF}
          </button>
        </div>
      </div>
    </div>
  );
}
