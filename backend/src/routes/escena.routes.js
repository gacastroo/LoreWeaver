import express from 'express';
import {
  obtenerEscenas,
  crearEscena,
  actualizarEscena,
  eliminarEscena
} from '../controllers/escena.controller.js';
import { verifyToken  } from '../middlewares/auth.js';


const router = express.Router();

router.get('/',verifyToken , obtenerEscenas);
router.post('/',verifyToken , crearEscena);
router.put('/:id',verifyToken , actualizarEscena);
router.delete('/:id',verifyToken , eliminarEscena);

export default router;
