import express from "express";
import { generarNombreConIA } from "../controllers/name.controller.js";

const router = express.Router();

router.post("/ia", generarNombreConIA); // no uses /huggingface

export default router;
