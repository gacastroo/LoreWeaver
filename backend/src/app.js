import express from 'express';
import cors from 'cors';

import usuarioRoutes from './routes/usuario.routes.js';
import personajeRoutes from './routes/personaje.routes.js';
import historiaRoutes from './routes/historia.routes.js';
import tagRoutes from './routes/tag.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import universoRoutes from './routes/universo.routes.js';
import capituloRoutes from './routes/capitulo.routes.js';
import escenaRoutes from './routes/escena.routes.js';
import mapaRoutes from './routes/mapa.routes.js';
import nameRoutes from './routes/name.routes.js';
import ideaRoutes from './routes/idea.routes.js';
import chatRoutes from './routes/chat.routes.js';

import { verifyToken } from './middlewares/auth.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL // se lee de .env en local o de Render en producción
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Rutas públicas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/names', nameRoutes);
app.use('/api/ideas', ideaRoutes);

// 🔒 Rutas protegidas con verifyToken
app.use('/api/personajes', verifyToken, personajeRoutes);
app.use('/api/historias', verifyToken, historiaRoutes);
app.use('/api/tags', verifyToken, tagRoutes);
app.use('/api', verifyToken, dashboardRoutes);
app.use('/api/universos', verifyToken, universoRoutes);
app.use('/api/capitulos', verifyToken, capituloRoutes);
app.use('/api/escenas', verifyToken, escenaRoutes);
app.use('/api/mapa', verifyToken, mapaRoutes);
app.use('/api/chat', chatRoutes);

export default app;
