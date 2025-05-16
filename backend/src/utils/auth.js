import jwt from "jsonwebtoken"

export const getUserIdFromToken = (req) => {
  // Si ya tenemos el usuario en req gracias al middleware
  if (req.usuario && req.usuario.id_usuario) {
    return req.usuario.id_usuario
  }

  // Si necesitamos extraerlo del token
  const authHeader = req.headers.authorization
  if (!authHeader) return null

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.id // Asumiendo que el ID está en decoded.id
  } catch (error) {
    return null
  }
}
