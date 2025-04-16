import prisma from '../prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const registrar = async (req, res) => {
  const { email, password, nombre } = req.body
  const existe = await prisma.usuario.findUnique({ where: { email } })

  if (existe) return res.status(400).json({ error: 'Ya existe el usuario' })

  const hashed = await bcrypt.hash(password, 10)
  const nuevo = await prisma.usuario.create({
    data: { email, password: hashed, nombre }
  })

  res.json({ message: 'Usuario creado', usuario: nuevo })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const usuario = await prisma.usuario.findUnique({ where: { email } })

  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

  const valido = await bcrypt.compare(password, usuario.password)
  if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' })

  const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre } })
}
