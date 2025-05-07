import express from 'express';
import {
  obtenerTags,
  eliminarTag,
  crearTag
} from '../controllers/tag.controller.js';
import { verificarToken } from '../middlewares/auth.js'


const router = express.Router();

router.get('/',verificarToken, obtenerTags);
router.delete('/:id',verificarToken, eliminarTag);
router.post('/', verificarToken, crearTag);

export default router;
