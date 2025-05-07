import express from 'express';
import { obtenerDatosMapa } from '../controllers/mapa.controller.js';
import { verifyToken  } from '../middlewares/auth.js'


const router = express.Router();

router.get('/',verifyToken , obtenerDatosMapa);

export default router;
