import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes.js';
import personajeRoutes from './routes/personaje.routes.js';
import historiaRoutes from './routes/historia.routes.js';
import tagRoutes from './routes/tag.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js'; 
import universoRoutes from './routes/universo.routes.js';
import capituloRoutes from './routes/capitulo.routes.js';
import escenaRoutes from './routes/escena.routes.js';
import mapaRoutes from './routes/mapa.routes.js';
import { verificarToken } from './middlewares/auth.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/usuarios', usuarioRoutes); // login y registro

// Rutas protegidas
app.use('/api/personajes', verificarToken, personajeRoutes);
app.use('/api/historias', verificarToken, historiaRoutes);
app.use('/api/tags', verificarToken, tagRoutes);
app.use('/api', verificarToken, dashboardRoutes);
app.use('/api/universos', verificarToken, universoRoutes);
app.use('/api/capitulos', verificarToken, capituloRoutes);
app.use('/api/escenas', verificarToken, escenaRoutes);
app.use('/api/mapa', verificarToken, mapaRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
