import express from "express";
import {
  obtenerPersonajes,
  crearPersonaje,
  actualizarPersonaje,
  eliminarPersonaje,
  asignarTagAPersonaje,
} from "../controllers/personaje.controller.js";
import { verificarToken } from "../middlewares/auth.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", obtenerPersonajes);
router.post("/", crearPersonaje);
router.put("/:id", actualizarPersonaje);
router.get("/:id", obtenerPersonajes);
router.delete("/:id", eliminarPersonaje);
router.post("/asignar-tag", asignarTagAPersonaje);

export default router;
