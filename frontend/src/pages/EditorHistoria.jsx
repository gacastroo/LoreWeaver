import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import API from "@/services/api";

export default function EditarHistoria() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      const contenido = editor.getHTML();
      guardarContenido(contenido);
    },
  });

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const res = await API.get(`/historias/${id}`);
        setTitulo(res.data.titulo);
        editor?.commands.setContent(res.data.contenido || "");
      } catch (error) {
        console.error("❌ Error al cargar historia:", error);
      } finally {
        setLoading(false);
      }
    };

    if (editor) {
      fetchHistoria();
    }
  }, [editor, id]);

  const guardarContenido = async (contenido) => {
    try {
      await API.put(`/historias/${id}`, { contenido });
    } catch (error) {
      console.error("❌ Error al guardar contenido:", error);
    }
  };

  if (loading || !editor) return <p className="p-6">Cargando historia...</p>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-black-800">{titulo}</h1>
      <div className="border rounded-md p-4 bg-black shadow">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
