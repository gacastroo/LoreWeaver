import express from 'express';
import {
  crearCapitulo,
  obtenerCapitulos,
  actualizarCapitulo,
  eliminarCapitulo
} from '../controllers/capitulo.controller.js';
import { verificarToken } from '../middlewares/auth.js';


const router = express.Router();

router.post('/',verificarToken, crearCapitulo);
router.get('/',verificarToken, obtenerCapitulos);
router.put('/:id',verificarToken, actualizarCapitulo);
router.delete('/:id',verificarToken, eliminarCapitulo);

export default router;
