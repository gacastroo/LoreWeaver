import express from 'express'
import {
  crearPersonaje,
  obtenerPersonajes,
  obtenerPersonaje,
  actualizarPersonaje,
  eliminarPersonaje
} from '../controllers/personaje.controller.js'
import { verificarToken } from '../middlewares/auth.js'

const router = express.Router()

// Rutas protegidas
router.post('/', verificarToken, crearPersonaje)
router.get('/', verificarToken, obtenerPersonajes)
router.get('/:id', verificarToken, obtenerPersonaje)
router.put('/:id', verificarToken, actualizarPersonaje)
router.delete('/:id', verificarToken, eliminarPersonaje)

export default router
