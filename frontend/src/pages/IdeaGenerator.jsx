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
        "https://ideagenerator-ovyw.onrender.com/generate",
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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          💡 Chat de Generación de Ideas Narrativas
        </h1>

        <div className="border border-gray-700 p-4 rounded-md h-96 overflow-y-auto bg-gray-800 shadow-inner mb-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] p-3 rounded-lg text-sm shadow-md ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-700 text-white"
                  : "mr-auto bg-green-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-gray-400 italic">⏳ Pensando...</div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none"
            placeholder="Escribe tu idea o prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-md text-white disabled:opacity-50"
          >
            Enviar
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-400 text-center">
          Este chat usa inteligencia artificial para ayudarte a generar ideas narrativas.
        </div>
      </div>
    </div>
  );
}
