import express from 'express';
import {
  obtenerEscenas,
  crearEscena,
  actualizarEscena,
  eliminarEscena
} from '../controllers/escena.controller.js';
import { verificarToken } from '../middlewares/auth.js';


const router = express.Router();

router.get('/',verificarToken, obtenerEscenas);
router.post('/',verificarToken, crearEscena);
router.put('/:id',verificarToken, actualizarEscena);
router.delete('/:id',verificarToken, eliminarEscena);

export default router;
