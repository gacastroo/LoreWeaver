import express from "express";
import { verificarToken } from "../middlewares/auth.js";
import { eliminarUniverso, obtenerUniversos } from '../controllers/universo.controller.js';


const router = express.Router();

router.get("/", verificarToken, obtenerUniversos);
router.delete('/:id', verificarToken, eliminarUniverso);

export default router;
