// src/components/ui/Toolbar.js
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaLink,
  FaUnlink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";

export default function Toolbar({ aplicarComando, insertarEnlace, eliminarEnlace }) {
  const botones = [
    { icon: FaBold, cmd: "bold", title: "Negrita" },
    { icon: FaItalic, cmd: "italic", title: "Cursiva" },
    { icon: FaUnderline, cmd: "underline", title: "Subrayado" },
    { icon: FaStrikethrough, cmd: "strikeThrough", title: "Tachado" },
    { icon: FaHeading, cmd: "formatBlock", arg: "H1", title: "Encabezado 1" },
    { icon: FaHeading, cmd: "formatBlock", arg: "H2", title: "Encabezado 2" },
    { icon: FaListUl, cmd: "insertUnorderedList", title: "Lista viñetas" },
    { icon: FaListOl, cmd: "insertOrderedList", title: "Lista numerada" },
  ];

  const alineaciones = [
    { icon: FaAlignLeft, cmd: "justifyLeft", title: "Alinear izquierda" },
    { icon: FaAlignCenter, cmd: "justifyCenter", title: "Alinear centro" },
    { icon: FaAlignRight, cmd: "justifyRight", title: "Alinear derecha" },
  ];

  const buttonClassName = `
    flex items-center justify-center 
    w-14 h-14 min-w-[56px] min-h-[56px] 
    text-gray-700 bg-white rounded-md shadow 
    hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400
    transition
  `;

  const iconStyle = { fontSize: "22px" };

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
          <Icon style={iconStyle} />
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
        <FaLink style={iconStyle} />
      </button>

      <button
        type="button"
        onClick={eliminarEnlace}
        title="Quitar enlace"
        className={buttonClassName}
      >
        <FaUnlink style={iconStyle} />
      </button>

      {alineaciones.map(({ icon: Icon, cmd, title }, i) => (
        <button
          key={i + 100}
          type="button"
          onClick={() => aplicarComando(cmd)}
          title={title}
          className={buttonClassName}
        >
          <Icon style={iconStyle} />
        </button>
      ))}
    </div>
  );
}
