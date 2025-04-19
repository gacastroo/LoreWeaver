import jwt from "jsonwebtoken";

export function getUserIdFromToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("Token no proporcionado");

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded.id;
}
