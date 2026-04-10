import express from "express"
import { generarIdeaNarrativa } from "../services/idea.service.js"

const router = express.Router()

// ✅ verifyToken ya se aplica en app.js al montar /api/ideas
router.post("/generar", generarIdeaNarrativa)

export default router