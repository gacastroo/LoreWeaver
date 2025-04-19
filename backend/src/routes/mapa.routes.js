import express from 'express';
import { obtenerDatosMapa } from '../controllers/mapa.controller.js';

const router = express.Router();

router.get('/', obtenerDatosMapa);

export default router;
