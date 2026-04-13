import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { useApp } from "@/context/AppContext";

export default function EditorCapitulo({ onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capitulo, setCapitulo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const fetchCapitulo = async () => {
      try {
        const res = await API.get(`/capitulos/${id}`);
        setCapitulo(res.data);
        setTitulo(res.data.titulo_capitulo || "");
        setContenido(res.data.contenido || "");
        ajustarAlturaTextarea();
      } catch (error) {
        console.error("❌ Error al cargar capítulo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCapitulo();
  }, [id]);

  const ajustarAlturaTextarea = () => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }
  };

  const handleChangeContenido = (e) => {
    setContenido(e.target.value);
    ajustarAlturaTextarea();
  };

  const handleGuardar = async () => {
    try {
      const res = await API.put(`/capitulos/${id}`, { titulo_capitulo: titulo, contenido });
      toast.success("Capítulo actualizado correctamente");
      onUpdate && onUpdate(res.data);
      navigate("/chapters");
    } catch (error) {
      console.error("❌ Error al actualizar capítulo:", error);
    }
  };

  const handleExportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Capítulo: ${titulo}`, 10, 20);
    doc.setFontSize(12);
    const lineas = doc.splitTextToSize(contenido, 180);
    doc.text(lineas, 10, 30);
    doc.save(`Capitulo_${titulo || "sin_titulo"}.pdf`);
  };

  if (loading) return <p className={`p-6 ${isLight ? "text-neutral-700" : "text-zinc-400"}`}>{t.cargandoCapitulo}</p>;

  return (
    <div className={`p-8 max-w-4xl mx-auto min-h-screen ${isLight ? "bg-white" : "bg-zinc-950"}`}>
      <h1 className={`text-2xl font-bold mb-4 ${isLight ? "text-neutral-700" : "text-gray-100"}`}>{t.editarCapitulo}</h1>

      <label className={`block mb-2 text-sm font-medium ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>{t.tituloLabel}</label>
      <input
        type="text"
        className={`w-full p-3 border text-lg font-semibold rounded-md mb-4 ${isLight ? "border-neutral-400 bg-white text-neutral-800" : "border-zinc-600 bg-zinc-800 text-gray-100"}`}
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder={t.tituloCapituloPlaceholder || "Título del capítulo"}
      />

      <label className={`block mb-2 text-sm font-medium ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>{t.contenidoLabel}</label>
      <textarea
        ref={textareaRef}
        className={`w-full p-4 border rounded-md resize-none ${isLight ? "border-neutral-400 bg-white text-neutral-800" : "border-zinc-600 bg-zinc-800 text-zinc-200"}`}
        value={contenido}
        onChange={handleChangeContenido}
        placeholder={t.contenidoPlaceholder || "Escribe el contenido del capítulo..."}
        style={{ minHeight: "150px", overflow: "hidden" }}
      />

      <div className="flex justify-end mt-4">
        <button onClick={handleGuardar} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          {t.guardarCambios}
        </button>
        <button onClick={handleExportarPDF} className="ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          {t.exportarPDF}
        </button>
      </div>
    </div>
  );
}
