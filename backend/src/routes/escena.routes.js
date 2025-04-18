import express from 'express';
import {
  obtenerEscenas,
  crearEscena,
  obtenerEscena,
  actualizarEscena,
  eliminarEscena
} from '../controllers/escena.controller.js';

const router = express.Router();

router.get('/', obtenerEscenas);
router.post('/', crearEscena);
router.get('/:id', obtenerEscena);
router.put('/:id', actualizarEscena);
router.delete('/:id', eliminarEscena);

export default router;
