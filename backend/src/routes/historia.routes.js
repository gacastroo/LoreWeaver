import express from 'express'
import {
  crearHistoria,
  obtenerHistorias,
  obtenerHistoria,
  actualizarHistoria,
  eliminarHistoria
} from '../controllers/historia.controller.js'
import { verifyToken  } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verifyToken , crearHistoria)
router.get('/', verifyToken , obtenerHistorias)
router.get('/:id', verifyToken , obtenerHistoria)
router.put('/:id', verifyToken , actualizarHistoria)
router.delete('/:id', verifyToken , eliminarHistoria)

export default router
