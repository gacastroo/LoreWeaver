import express from "express"
import { generarIdeaNarrativa } from "../services/idea.service.js"

const router = express.Router()

router.post("/generar", generarIdeaNarrativa)

export default router
