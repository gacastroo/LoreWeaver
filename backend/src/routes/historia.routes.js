import express from 'express'
import {
  crearHistoria,
  obtenerHistorias,
  obtenerHistoria,
  actualizarHistoria,
  eliminarHistoria,
  obtenerRelacionesHistoria
} from '../controllers/historia.controller.js'
import { verifyToken  } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verifyToken , crearHistoria)
router.get('/', verifyToken , obtenerHistorias)
router.get('/:id', verifyToken , obtenerHistoria)
router.put('/:id', verifyToken , actualizarHistoria)
router.delete('/:id', verifyToken , eliminarHistoria)
router.get("/:id/relaciones", verifyToken, obtenerRelacionesHistoria);


export default router
