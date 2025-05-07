import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    AlignLeft,
    AlignCenter,
    AlignRight,
  } from "lucide-react";
  
  export default function Toolbar({ editor }) {
    if (!editor) return null;
  
    const buttonStyle = (isActive) =>
      `p-2 rounded hover:bg-neutral-200 ${
        isActive ? "bg-blue-100 text-blue-600" : "text-neutral-700"
      }`;
  
    return (
      <div className="flex flex-wrap gap-1 border rounded p-2 mb-4 bg-white shadow-sm items-center">
        {/* Estilo */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonStyle(editor.isActive("bold"))}>
          <Bold size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonStyle(editor.isActive("italic"))}>
          <Italic size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonStyle(editor.isActive("underline"))}>
          <Underline size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonStyle(editor.isActive("strike"))}>
          <Strikethrough size={16} />
        </button>
  
        {/* Encabezados */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonStyle(editor.isActive("heading", { level: 1 }))}>
          <Heading1 size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonStyle(editor.isActive("heading", { level: 2 }))}>
          <Heading2 size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonStyle(editor.isActive("heading", { level: 3 }))}>
          <Heading3 size={16} />
        </button>
  
        {/* Listas */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonStyle(editor.isActive("bulletList"))}>
          <List size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonStyle(editor.isActive("orderedList"))}>
          <ListOrdered size={16} />
        </button>
  
        {/* Alineación */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={buttonStyle(editor.isActive({ textAlign: "left" }))}>
          <AlignLeft size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={buttonStyle(editor.isActive({ textAlign: "center" }))}>
          <AlignCenter size={16} />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={buttonStyle(editor.isActive({ textAlign: "right" }))}>
          <AlignRight size={16} />
        </button>
      </div>
    );
  }
  