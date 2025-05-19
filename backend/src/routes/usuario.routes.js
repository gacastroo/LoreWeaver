import express from 'express'
import { registrar, login, solicitarResetPassword,resetPasswordConToken  } from '../controllers/usuario.controller.js'

const router = express.Router()

router.post('/registro', registrar)
router.post('/login', login)
// Nuevo endpoint para solicitar restablecimiento
router.post('/reset-password', solicitarResetPassword);

// Nuevo endpoint para restablecer con token
router.put('/reset-password/:token', resetPasswordConToken);

export default router
