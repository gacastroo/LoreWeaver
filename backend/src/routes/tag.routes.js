import express from 'express';
import {
  obtenerTags,
  eliminarTag
} from '../controllers/tag.controller.js';
import { verificarToken } from '../middlewares/auth.js'


const router = express.Router();

router.get('/',verificarToken, obtenerTags);
router.delete('/:id',verificarToken, eliminarTag);

export default router;
