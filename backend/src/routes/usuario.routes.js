import express from 'express'
import { verifyToken } from "../middlewares/auth.js";
import { registrar, login, solicitarResetPassword, resetPasswordConToken  } from '../controllers/usuario.controller.js'
import { asociarUniversoAHistoria } from "../controllers/universo.controller.js";



const router = express.Router()

router.post('/registro', registrar)
router.post('/login', login)
// Nuevo endpoint para solicitar restablecimiento
router.post('/reset-password', solicitarResetPassword);

// Nuevo endpoint para restablecer con token
router.put('/reset-password/:token', resetPasswordConToken);
router.patch("/:id/asociar", verifyToken, asociarUniversoAHistoria);

export default router
