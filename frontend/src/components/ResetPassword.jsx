import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";

export default function ResetPassword() {
  const { token } = useParams(); // token de la URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      // Petición PUT al backend para cambiar la contraseña con token
      await API.put(`/usuarios/reset-password/${token}`, { password });
      setSuccess("✅ Contraseña actualizada correctamente. Redirigiendo...");
      setTimeout(() => navigate("/api/login"), 3000);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Error al cambiar la contraseña.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Restablecer contraseña</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700 font-medium">Nueva contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Nueva contraseña"
          required
        />

        <label className="block mb-2 text-gray-700 font-medium">Confirmar contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Confirma tu contraseña"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
        >
          {loading ? "Guardando..." : "Cambiar contraseña"}
        </button>
      </form>
    </div>
  );
}
