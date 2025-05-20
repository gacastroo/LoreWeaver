import express from 'express';
import {
  obtenerTags,
  eliminarTag,
  crearTag
} from '../controllers/tag.controller.js';
import { verifyToken  } from '../middlewares/auth.js'


const router = express.Router();

router.get('/',verifyToken , obtenerTags);
router.patch('/:id',verifyToken , eliminarTag);
router.post('/', verifyToken , crearTag);
export default router;
