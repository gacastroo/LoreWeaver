import express from "express";
import { verificarToken } from "../middlewares/auth.js";
import { eliminarUniverso, obtenerUniversos,obtenerUniversoPorId,actualizarUniverso } from '../controllers/universo.controller.js';


const router = express.Router();

router.get("/", verificarToken, obtenerUniversos);
router.delete('/:id', verificarToken, eliminarUniverso);
router.get('/:id', verificarToken, obtenerUniversoPorId);
router.put('/:id', verificarToken, actualizarUniverso);


export default router;
