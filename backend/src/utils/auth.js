// utils/auth.js
import jwt from "jsonwebtoken"

export const getUserIdFromToken = (req) => {
  // Si ya tenemos el usuario en req gracias al middleware
  if (req.usuario && req.usuario.id) {
    return req.usuario.id;
  }

  // Si necesitamos extraerlo del token directamente
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // Asumiendo que el token incluye { id: usuario.id_usuario }
  } catch (error) {
    return null;
  }
};
