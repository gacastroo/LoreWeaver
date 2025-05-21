import { useState } from "react";
import axios from "axios";

export default function IdeaGenerator() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
        const res = await axios.post(
        "https://idea-generator.up.railway.app/generate", // <-- aquí falta la coma
        { prompt: input },
        {
            headers: {
            "Content-Type": "application/json",
            },
        }
        );


      setMessages((prev) => [
        ...prev,
        { sender: "ia", text: res.data.idea.trim() },
      ]);
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ia", text: "❌ Error generando respuesta." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="px-12 text-neutral-700 mb-4">💡 Chat de Generación de Ideas</h1>

      <div className="border p-4 rounded-md h-96 overflow-y-auto bg-gray-50 shadow-inner mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-green-100 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-400 italic">⏳ Pensando...</div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md p-2"
          placeholder="Escribe tu idea o prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
