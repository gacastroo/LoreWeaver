import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import Toolbar from "@/components/Toolbar"

export default function RichTextEditor({ initialContent, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }, // ✅ puedes personalizar si quieres
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link,
    ],
    content: initialContent || "<p>Escribe aquí...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return <p className="text-neutral-500">Cargando editor...</p>

  return (
    <div className="space-y-4">
      <Toolbar editor={editor} className />
      <EditorContent editor={editor} className="border border-gray-300 rounded p-4 min-h-[300px] bg-white text-neutral-800" />
    </div>
  )
}
