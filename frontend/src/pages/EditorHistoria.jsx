import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import API from "@/services/api";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Toolbar from "@/components/Toolbar";



export default function EditorHistoria() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(true);
  const [contenidoInicial, setContenidoInicial] = useState("<p>Cargando contenido...</p>");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link
    ],
    content: "<p>Escribe tu historia aquí...</p>",
  });
  

  // 🔁 Se ejecuta cuando editor esté montado
  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const res = await API.get(`/historias/${id}`);
        setTitulo(res.data.titulo);
        setContenidoInicial(res.data.contenido || "<p>Vacío</p>");
        editor?.commands.setContent(res.data.contenido || "<p>Vacío</p>");
      } catch (err) {
        console.error("❌ Error al obtener la historia", err);
      } finally {
        setLoading(false);
      }
    };

    if (editor) fetchHistoria();
  }, [editor, id]);

  const handleGuardar = async () => {
    try {
      const contenido = editor?.getHTML();
      await API.put(`/historias/${id}`, { contenido });
      alert("✅ Historia actualizada correctamente");
    } catch (err) {
      console.error("❌ Error al guardar historia", err);
    }
  };

  if (loading || !editor) return <p className="p-6">Cargando historia...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-neutral-800">✍️ Editar: {titulo}</h1>
  
      {/* 🛠️ Barra de herramientas */}
      <Toolbar editor={editor}/>
  
      {/* ✍️ Área del editor */}
      <EditorContent
        editor={editor}
        className="border border-gray-300 rounded p-4 min-h-[300px] bg-white text-neutral-800"
      />
  
      {/* 💾 Botón de guardar */}
      <button
        onClick={handleGuardar}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Guardar cambios
      </button>
    </div>
  )
  
}
