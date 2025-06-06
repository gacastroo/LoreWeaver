import express from "express";
import {
  crearUniverso,
  eliminarUniverso,
  obtenerUniversos,
  obtenerUniversoPorId,
  actualizarUniverso,
  asociarUniversoAHistoria,
  desasociarHistoriaUniverso
} from "../controllers/universo.controller.js";
import { verifyToken } from "../middlewares/auth.js";




const router = express.Router();

// ✅ Crear un universo (historia opcional)
router.post("/", verifyToken, crearUniverso);

// ✅ Obtener todos los universos del usuario
router.get("/", verifyToken, obtenerUniversos);

// ✅ Obtener un universo por ID
router.get("/:id", verifyToken, obtenerUniversoPorId);

// ✅ Actualizar universo (solo si el usuario tiene acceso)
router.put("/:id", verifyToken, actualizarUniverso);

// ✅ Eliminar universo
router.delete("/:id", verifyToken, eliminarUniverso);

// ✅ Asociar universo
router.patch("/:id/asociar", verifyToken, asociarUniversoAHistoria);
// ✅ Desasociar historia de un universo
router.patch("/:id/desasociar-historia", desasociarHistoriaUniverso);
export default router;
