import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const registrar = async (req, res) => {
  try {
    const { email, password, nombre } = req.body

    const existe = await prisma.usuario.findUnique({ where: { email } })
    if (existe) return res.status(400).json({ message: 'Ya existe el usuario' })

    const hashed = await bcrypt.hash(password, 10)

    const nuevo = await prisma.usuario.create({
      data: { email, password: hashed, nombre }
    })

    const token = jwt.sign({ id: nuevo.id_usuario }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      usuario: {
        id: nuevo.id_usuario,
        email: nuevo.email,
        nombre: nuevo.nombre
      }
    })
  } catch (error) {
    console.error("Error al registrar:", error)
    res.status(500).json({ message: "Error inesperado" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })

    const valido = await bcrypt.compare(password, usuario.password)
    if (!valido) return res.status(401).json({ message: 'Contraseña incorrecta' })

    const token = jwt.sign({ id: usuario.id_usuario }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      usuario: {
        id: usuario.id_usuario,
        email: usuario.email,
        nombre: usuario.nombre
      }
    })
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    res.status(500).json({ message: "Error inesperado" })
  }
}
