import express from 'express'
import {
  crearHistoria,
  obtenerHistorias,
  obtenerHistoria,
  actualizarHistoria,
  eliminarHistoria
} from '../controllers/historia.controller.js'
import { verificarToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verificarToken, crearHistoria)
router.get('/', verificarToken, obtenerHistorias)
router.get('/:id', verificarToken, obtenerHistoria)
router.put('/:id', verificarToken, actualizarHistoria)
router.delete('/:id', verificarToken, eliminarHistoria)

export default router
