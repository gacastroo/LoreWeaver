import express from 'express'
import rateLimit from 'express-rate-limit'
import { verifyToken } from "../middlewares/auth.js";
import { registrar, login, solicitarResetPassword, resetPasswordConToken } from '../controllers/usuario.controller.js'
import { asociarUniversoAHistoria } from "../controllers/universo.controller.js";

const router = express.Router()

// 🔒 Rate limiting — máx. 5 intentos de login por IP cada 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos. Espera 15 minutos e inténtalo de nuevo.' },
})

// 🔒 Rate limiting — máx. 10 registros por IP por hora
const registroLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes de registro. Inténtalo más tarde.' },
})

// 🔒 Rate limiting — máx. 3 solicitudes de reset por IP por hora
const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes de reset. Inténtalo en una hora.' },
})

router.post('/registro', registroLimiter, registrar)
router.post('/login', loginLimiter, login)
router.post('/reset-password', resetLimiter, solicitarResetPassword)
router.put('/reset-password/:token', resetLimiter, resetPasswordConToken)
router.patch("/:id/asociar", verifyToken, asociarUniversoAHistoria);

export default router
