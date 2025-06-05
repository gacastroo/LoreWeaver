import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import jsPDF from "jspdf";

export default function EditorHistoria({ onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historia, setHistoria] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [capitulos, setCapitulos] = useState([]);
  const [expandido, setExpandido] = useState([]);
  const [loading, setLoading] = useState(true);
  const textareaRefs = useRef([]);

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const res = await API.get(`/historias/${id}`);
        setHistoria(res.data);
        setTitulo(res.data.titulo || "");
        setCapitulos(res.data.capitulos || []);
        setExpandido(res.data.capitulos?.map(() => true) || []);
      } catch (error) {
        console.error("❌ Error al cargar historia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoria();
  }, [id]);

  const toggleExpandido = (index) => {
    setExpandido((prev) => prev.map((val, i) => {
      if (i === index && !val) setTimeout(() => ajustarAlturaTextarea(i), 0);
      return i === index ? !val : val;
    }));
  };


  const ajustarAlturaTextarea = (index) => {
    const ta = textareaRefs.current[index];
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  };

  const handleChangeContenido = (index, value) => {
    setCapitulos((prev) =>
      prev.map((cap, i) => (i === index ? { ...cap, contenido: value } : cap))
    );
    ajustarAlturaTextarea(index);
  };

  const handleChangeTituloCapitulo = (index, value) => {
    setCapitulos((prev) =>
      prev.map((cap, i) => (i === index ? { ...cap, titulo_capitulo: value } : cap))
    );
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
            historiaId: parseInt(id)
          });
        } else {
          await API.post(`/capitulos`, {
            titulo_capitulo: cap.titulo_capitulo,
            contenido: cap.contenido,
            historiaId: parseInt(id)
          });
        }
      }
      alert("✅ Historia y capítulos actualizados correctamente");
      onUpdate && onUpdate();
      navigate("/stories");
    } catch (error) {
      console.error("❌ Error al actualizar historia:", error);
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
      if (y + texto.length * 7 > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(texto, 10, y);
      y += texto.length * 7;
      doc.setFontSize(14);
    });

    doc.save(`historia_${titulo || "sin_titulo"}.pdf`);
  };

  if (loading) return <p className="p-6 text-neutral-700">Cargando historia...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-neutral-700">✍️ Editar Historia</h1>

      <button
        onClick={() => navigate(`/historia/${id}/relaciones`)}
        className="text-sm bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 transition"
      >
        📚 Ver elementos relacionados
      </button>

      <label className="block text-sm font-medium text-neutral-700">Título</label>
      <input
        type="text"
        className="w-full p-3 border border-neutral-400 text-lg font-semibold rounded-md mb-4"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la historia"
      />

      {capitulos.map((cap, index) => (
        <div key={index} className="bg-white border p-4 rounded-md shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={cap.titulo_capitulo}
              onChange={(e) => handleChangeTituloCapitulo(index, e.target.value)}
              className="w-full font-semibold text-lg border rounded-md p-2 outline-none"
              placeholder={`Capítulo ${index + 1}`}
            />
            <div className="ml-2 flex gap-2">
              <button onClick={() => toggleExpandido(index)} className="text-sm text-blue-500 hover:underline">
                {expandido[index] ? "Minimizar" : "Expandir"}
              </button>
              {capitulos.length > 1 && (
                <button onClick={() => eliminarCapitulo(index)} className="text-sm text-red-500 hover:underline">
                  Eliminar
                </button>
              )}
            </div>
          </div>

          {expandido[index] && (
            <textarea
              ref={(el) => (textareaRefs.current[index] = el)}
              value={cap.contenido || ""}
              onChange={(e) => handleChangeContenido(index, e.target.value)}
              placeholder="Escribe el contenido del capítulo..."
              className="w-full p-3 border border-neutral-300 text-neutral-800 rounded-md resize-none bg-neutral-50"
              style={{ minHeight: "150px", overflow: "hidden" }}
            />
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <button
          onClick={agregarCapitulo}
          className="flex items-center gap-2 bg-gray-200 text-neutral-800 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
          ➕ Añadir capítulo
        </button>

        <div className="flex gap-4">
          <button
            onClick={handleGuardar}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Guardar cambios
          </button>

          <button
            onClick={handleExportarPDF}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
}
