import express from "express";
import {
  obtenerPersonajes,
  crearPersonaje,
  actualizarPersonaje,
  eliminarPersonaje,
  asignarTagAPersonaje,
  obtenerPersonajePorId,
  asociarPersonajeAHistoria,
  desasociarHistoriaPersonaje,
  quitarTagPersonaje
} from "../controllers/personaje.controller.js";
import { verifyToken } from "../middlewares/auth.js"; // ✅ nombre corregido



const router = express.Router();

// 🔒 Aplica protección JWT a todas las rutas
router.use(verifyToken);

// 🔹 CRUD de personajes
router.get("/", obtenerPersonajes);
router.post("/", crearPersonaje);
router.put("/:id", actualizarPersonaje);
router.delete("/:id", eliminarPersonaje);
router.patch("/:id/asociar", verifyToken, asociarPersonajeAHistoria);


// 🔹 Obtener personaje por ID (opcional)
router.get("/:id", obtenerPersonajePorId); // Solo si tienes esta función

// 🔹 Asignar tag a personaje
router.post("/agregar-tag", asignarTagAPersonaje); // 🔐 Ya está protegido por router.use

router.patch('/:id/desasociar-historia', desasociarHistoriaPersonaje);

router.patch('/:id/quitar-tag', quitarTagPersonaje);


export default router;
