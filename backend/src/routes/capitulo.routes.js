import express from 'express';
import {
  crearCapitulo,
  obtenerCapitulos,
  actualizarCapitulo,
  eliminarCapitulo,
  obtenerCapitulo,
  actualizarContenidoCapitulo,
obtenerCapitulosPorHistoria
} from '../controllers/capitulo.controller.js';
import { verifyToken  } from '../middlewares/auth.js';


const router = express.Router();

router.post('/',verifyToken , crearCapitulo);
router.get('/',verifyToken , obtenerCapitulos);
router.get("/:id", verifyToken, obtenerCapitulo);
router.put("/:id", verifyToken, actualizarContenidoCapitulo);
router.put('/:id',verifyToken , actualizarCapitulo);
router.delete('/:id',verifyToken , eliminarCapitulo);
router.post("/", verifyToken, crearCapitulo);
router.get("/por-historia/:historiaId", verifyToken, obtenerCapitulosPorHistoria);
export default router;
