// middlewares/auth.js
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // ✅ Soporte dual: compatibilidad con "id" y transición a "id_usuario"
    req.usuario = {
      id_usuario: decoded.id_usuario,
      id: decoded.id_usuario
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" })
  }

}
