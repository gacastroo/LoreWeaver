import express from 'express';
import { obtenerDatosMapa } from '../controllers/mapa.controller.js';
import { verificarToken } from '../middlewares/auth.js'


const router = express.Router();

router.get('/',verificarToken, obtenerDatosMapa);

export default router;
