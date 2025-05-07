import express from 'express';
import {
  crearCapitulo,
  obtenerCapitulos,
  actualizarCapitulo,
  eliminarCapitulo
} from '../controllers/capitulo.controller.js';
import { verifyToken  } from '../middlewares/auth.js';


const router = express.Router();

router.post('/',verifyToken , crearCapitulo);
router.get('/',verifyToken , obtenerCapitulos);
router.put('/:id',verifyToken , actualizarCapitulo);
router.delete('/:id',verifyToken , eliminarCapitulo);

export default router;
