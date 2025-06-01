import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { sendResetEmail } from '../services/emailService.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
const tokensReset = new Map()

export const registrar = async (req, res) => {
  try {
    const { email, password, nombre } = req.body

    const existe = await prisma.usuario.findUnique({ where: { email } })
    if (existe) return res.status(400).json({ message: 'Ya existe el usuario' })

    const hashed = await bcrypt.hash(password, 10)

    const nuevo = await prisma.usuario.create({
      data: { email, password: hashed, nombre }
    })

    const token = jwt.sign(
      { id_usuario: nuevo.id_usuario, id: nuevo.id_usuario }, // ✅ incluye ambos
      JWT_SECRET,
      { expiresIn: '7d' }
    )

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

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, id: usuario.id_usuario }, // ✅ compatibilidad
      JWT_SECRET,
      { expiresIn: '7d' }
    )

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

export async function solicitarResetPassword(req, res) {
  const { email } = req.body
  try {
    if (!email) return res.status(400).json({ message: 'Email requerido' })

    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
      return res.status(200).json({ message: 'Si el email existe, se enviará un link' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiracion = Date.now() + 3600 * 1000 // 1 hora

    tokensReset.set(token, { userId: usuario.id_usuario, expires: expiracion })

    await sendResetEmail(email, token)

    return res.status(200).json({ message: 'Email enviado con instrucciones' })
  } catch (error) {
    console.error('Error en solicitarResetPassword:', error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export async function resetPasswordConToken(req, res) {
  const { token } = req.params
  const { password } = req.body

  try {
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Contraseña inválida' })
    }

    const data = tokensReset.get(token)
    if (!data) return res.status(400).json({ message: 'Token inválido o expirado' })

    if (data.expires < Date.now()) {
      tokensReset.delete(token)
      return res.status(400).json({ message: 'Token expirado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.usuario.update({
      where: { id_usuario: data.userId },
      data: { password: hashedPassword },
    })

    tokensReset.delete(token)

    return res.status(200).json({ message: 'Contraseña actualizada' })
  } catch (error) {
    console.error('Error en resetPasswordConToken:', error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
