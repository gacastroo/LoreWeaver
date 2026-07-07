import { useState } from "react";

export default function ResetPassword() {
  const token = window.location.pathname.split("/").filter(Boolean).pop();

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
      const { default: API } = await import("@/services/api");
      // Petición PUT al backend para cambiar la contraseña con token
      await API.put(`/usuarios/reset-password/${token}`, { password });
      setSuccess("✅ Contraseña actualizada correctamente. Redirigiendo...");
      setTimeout(() => window.location.assign("/"), 3000);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Error al cambiar la contraseña.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Restablecer contraseña</h1>

      {error && <p className="text-red-600 mb-3" role="alert">{error}</p>}
      {success && <p className="text-green-600 mb-3" role="status">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="new-password" className="block mb-2 text-gray-700 font-medium">Nueva contraseña</label>
        <input
          id="new-password"
          name="new-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          placeholder="Nueva contraseña"
          required
        />

        <label htmlFor="confirm-password" className="block mb-2 text-gray-700 font-medium">Confirmar contraseña</label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          placeholder="Confirma tu contraseña"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? "Guardando..." : "Cambiar contraseña"}
        </button>
      </form>
    </main>
  );
}
