import express from "express"
import { generarIdeaNarrativa } from "../services/idea.service.js"
import { verifyToken } from "../middlewares/auth.js"

const router = express.Router()

router.post("/generar", verifyToken, generarIdeaNarrativa)

export default router