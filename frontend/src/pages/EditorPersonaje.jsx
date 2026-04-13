import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { useApp } from "@/context/AppContext";

export default function EditorPersonaje({ onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);
  const { theme, t } = useApp();
  const isLight = theme === "light";

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        const res = await API.get(`/personajes/${id}`);
        setPersonaje(res.data);
        setNombre(res.data.nombre_personaje || "");
        setDescripcion(res.data.descripcion_personaje || "");
        ajustarAlturaTextarea();
      } catch (error) {
        console.error("❌ Error al cargar personaje:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonaje();
  }, [id]);

  const ajustarAlturaTextarea = () => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
    ajustarAlturaTextarea();
  };

  const handleGuardar = async () => {
    try {
      const res = await API.put(`/personajes/${id}`, {
        nombre_personaje: nombre,
        descripcion_personaje: descripcion,
      });
      toast.success("Personaje actualizado correctamente");
      onUpdate && onUpdate(res.data);
      navigate("/characters");
    } catch (error) {
      console.error("❌ Error al actualizar personaje:", error);
    }
  };

  const handleExportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Personaje: ${nombre}`, 10, 20);
    doc.setFontSize(12);
    const lineas = doc.splitTextToSize(descripcion, 180);
    doc.text(lineas, 10, 30);
    doc.save(`personaje_${nombre || "sin_nombre"}.pdf`);
  };

  if (loading) return <p className={`p-6 ${isLight ? "text-neutral-700" : "text-zinc-400"}`}>{t.cargandoPersonaje}</p>;

  return (
    <div className={`p-8 max-w-4xl mx-auto min-h-screen ${isLight ? "bg-white" : "bg-zinc-950"}`}>
      {personaje && (
        <div className={`flex flex-wrap gap-4 mb-6 border-b pb-4 ${isLight ? "border-neutral-200" : "border-zinc-700"}`}>
          {personaje.historia && (
            <button
              onClick={() => navigate(`/historia/${personaje.historia?.id}`)}
              className={`hover:underline text-sm ${isLight ? "text-blue-600" : "text-blue-400"}`}
            >
              {t.irAHistoria} {personaje.historia.titulo}
            </button>
          )}
        </div>
      )}

      <h1 className={`text-2xl font-bold mb-4 ${isLight ? "text-neutral-700" : "text-gray-100"}`}>{t.editarPersonaje}</h1>

      <label className={`block mb-2 text-sm font-medium ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>{t.nombreLabel}</label>
      <input
        type="text"
        className={`w-full p-3 border text-lg font-semibold rounded-md mb-4 ${isLight ? "border-neutral-400 bg-white text-neutral-800" : "border-zinc-600 bg-zinc-800 text-gray-100"}`}
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder={t.nombrePersonajePlaceholder || "Nombre del personaje"}
      />

      <label className={`block mb-2 text-sm font-medium ${isLight ? "text-neutral-700" : "text-zinc-300"}`}>{t.descripcionLabel}</label>
      <textarea
        ref={textareaRef}
        className={`w-full p-4 border rounded-md resize-none ${isLight ? "border-neutral-400 bg-white text-neutral-800" : "border-zinc-600 bg-zinc-800 text-zinc-200"}`}
        value={descripcion}
        onChange={handleDescripcionChange}
        placeholder={t.descripcionPersonajePlaceholder || "Escribe la descripción del personaje..."}
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
