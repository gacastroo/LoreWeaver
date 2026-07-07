// src/components/ui/Toolbar.jsx
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Italic,
  Link,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  Unlink,
} from "lucide-react";

export default function Toolbar({ aplicarComando, insertarEnlace, eliminarEnlace }) {
  const botones = [
    { icon: Bold, cmd: "bold", title: "Negrita" },
    { icon: Italic, cmd: "italic", title: "Cursiva" },
    { icon: Underline, cmd: "underline", title: "Subrayado" },
    { icon: Strikethrough, cmd: "strikeThrough", title: "Tachado" },
    { icon: Heading1, cmd: "formatBlock", arg: "H1", title: "Encabezado 1" },
    { icon: Heading2, cmd: "formatBlock", arg: "H2", title: "Encabezado 2" },
    { icon: List, cmd: "insertUnorderedList", title: "Lista viñetas" },
    { icon: ListOrdered, cmd: "insertOrderedList", title: "Lista numerada" },
  ];

  const alineaciones = [
    { icon: AlignLeft, cmd: "justifyLeft", title: "Alinear izquierda" },
    { icon: AlignCenter, cmd: "justifyCenter", title: "Alinear centro" },
    { icon: AlignRight, cmd: "justifyRight", title: "Alinear derecha" },
  ];

  const buttonClassName = `
    flex items-center justify-center 
    w-14 h-14 min-w-[56px] min-h-[56px] 
    text-gray-700 bg-white rounded-md shadow 
    hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400
    transition
  `;

  return (
    <div
      className="flex flex-wrap gap-3 mb-4 px-3 py-2 bg-gray-100 rounded-md shadow-inner overflow-x-auto"
      style={{ maxWidth: "100%" }}
    >
      {botones.map(({ icon: Icon, cmd, arg, title }, i) => (
        <button
          key={i}
          type="button"
          onClick={() => aplicarComando(cmd, arg)}
          title={title}
          className={buttonClassName}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
          {cmd === "formatBlock" && (
            <span className="ml-1 font-bold select-none">{arg.slice(1)}</span>
          )}
        </button>
      ))}

      <button
        type="button"
        onClick={insertarEnlace}
        title="Insertar enlace"
        className={buttonClassName}
      >
        <Link className="w-6 h-6" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={eliminarEnlace}
        title="Quitar enlace"
        className={buttonClassName}
      >
        <Unlink className="w-6 h-6" aria-hidden="true" />
      </button>

      {alineaciones.map(({ icon: Icon, cmd, title }, i) => (
        <button
          key={i + 100}
          type="button"
          onClick={() => aplicarComando(cmd)}
          title={title}
          className={buttonClassName}
        >
          <Icon className="w-6 h-6" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
