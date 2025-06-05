import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import jsPDF from "jspdf";

export default function EditorCapitulo({ onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capitulo, setCapitulo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);

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
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  };

  const handleChangeContenido = (e) => {
    setContenido(e.target.value);
    ajustarAlturaTextarea();
  };

  const handleGuardar = async () => {
    try {
      const res = await API.put(`/capitulos/${id}`, {
        titulo_capitulo: titulo,
        contenido,
      });

      alert("✅ Capítulo actualizado correctamente");
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

  if (loading) return <p className="p-6 text-neutral-700">Cargando capítulo...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-neutral-700">✍️ Editar Capítulo</h1>

      <label className="block mb-2 text-sm font-medium text-neutral-700">Título del capítulo</label>
      <input
        type="text"
        className="w-full p-3 border border-neutral-400 text-lg font-semibold rounded-md mb-4"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del capítulo"
      />

      <label className="block mb-2 text-sm font-medium text-neutral-700">Contenido</label>
      <textarea
        ref={textareaRef}
        className="w-full p-4 border border-neutral-400 text-neutral-800 rounded-md bg-white resize-none"
        value={contenido}
        onChange={handleChangeContenido}
        placeholder="Escribe el contenido del capítulo..."
        style={{ minHeight: "150px", overflow: "hidden" }}
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={handleGuardar}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Guardar cambios
        </button>

        <button
          onClick={handleExportarPDF}
          className="ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Exportar PDF
        </button>
      </div>
    </div>
  );
}
