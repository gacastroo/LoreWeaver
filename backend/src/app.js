import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

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

// ✅ Cabeceras de seguridad HTTP (anti-clickjacking, CSP, HSTS, etc.)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // evita romper carga de recursos externos si los usas
}));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://lore-weaver-1zpq.vercel.app',
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_PREVIEW,
  ...(process.env.ALLOWED_ORIGINS?.split(',') || []),
]
  .filter(Boolean)
  .map(origin => origin.trim().replace(/\/$/, ''));

const isAllowedOrigin = (origin) => {
  return (
    allowedOrigins.includes(origin) ||
    /^https:\/\/lore-weaver-[a-z0-9-]+\.vercel\.app$/.test(origin)
  );
};

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');

    if (isAllowedOrigin(cleanOrigin)) {
      return callback(null, true);
    }

    console.warn(`🚫 CORS bloqueado para origen: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Rutas públicas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/names', nameRoutes);

// 🔒 Rutas protegidas con verifyToken
app.use('/api/ideas', verifyToken, ideaRoutes);
app.use('/api/chat', verifyToken, chatRoutes);
app.use('/api/personajes', verifyToken, personajeRoutes);
app.use('/api/historias', verifyToken, historiaRoutes);
app.use('/api/tags', verifyToken, tagRoutes);
app.use('/api', verifyToken, dashboardRoutes);
app.use('/api/universos', verifyToken, universoRoutes);
app.use('/api/capitulos', verifyToken, capituloRoutes);
app.use('/api/escenas', verifyToken, escenaRoutes);
app.use('/api/mapa', verifyToken, mapaRoutes);

export default app;
