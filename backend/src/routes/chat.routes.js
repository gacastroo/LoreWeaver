import express from "express"
import { chatNarrativo } from "../controllers/chatNarrativo.controller.js"
import { obtenerElementosPorTipo } from "../controllers/chatElementos.controller.js"
import { verifyToken } from "../middlewares/auth.js"

const router = express.Router()

router.post("/", verifyToken, chatNarrativo)
router.get("/elementos/:tipo", verifyToken, obtenerElementosPorTipo)

export default router
