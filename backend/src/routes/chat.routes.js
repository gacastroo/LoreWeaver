import express from "express"
import { chatNarrativo } from "../controllers/chatNarrativo.controller.js"
import { obtenerElementosPorTipo } from "../controllers/chatElementos.controller.js"

const router = express.Router()

// ✅ verifyToken ya se aplica en app.js al montar /api/chat
router.post("/", chatNarrativo)
router.get("/elementos/:tipo", obtenerElementosPorTipo)

export default router