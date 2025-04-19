import express from 'express';
import {
  obtenerTags,
  eliminarTag
} from '../controllers/tag.controller.js';

const router = express.Router();

router.get('/', obtenerTags);
router.delete('/:id', eliminarTag);

export default router;
