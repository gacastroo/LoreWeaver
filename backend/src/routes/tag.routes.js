import express from 'express'
import {
  crearTag,
  obtenerTags,
  asignarTag,
  eliminarTagDePersonaje,
  obtenerTagsDePersonaje
} from '../controllers/tag.controller.js'
import { verificarToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', verificarToken, crearTag)
router.get('/', verificarToken, obtenerTags)
router.post('/asignar', verificarToken, asignarTag)
router.post('/eliminar', verificarToken, eliminarTagDePersonaje)
router.get('/personaje/:id', verificarToken, obtenerTagsDePersonaje)

export default router
