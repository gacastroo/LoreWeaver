import express from "express";
import prisma from "../lib/prisma.js";
import { verificarToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verificarToken, async (req, res) => {
  try {
    const universos = await prisma.universo.findMany({
      include: {
        historia: {
          select: { titulo: true },
        },
      },
    });
    res.json(universos);
  } catch (error) {
    console.error("❌ Error al obtener universos:", error);
    res.status(500).json({ error: "Error al obtener universos" });
  }
});

export default router;
