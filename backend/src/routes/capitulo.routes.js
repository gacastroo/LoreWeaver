import express from 'express';
import {
  crearCapitulo,
  obtenerCapitulos,
  actualizarCapitulo,
  eliminarCapitulo
} from '../controllers/capitulo.controller.js';

const router = express.Router();

router.post('/', crearCapitulo);
router.get('/', obtenerCapitulos);
router.put('/:id', actualizarCapitulo);
router.delete('/:id', eliminarCapitulo);

export default router;
