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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/personajes', personajeRoutes);
app.use('/api/historias', historiaRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/universos', universoRoutes);
app.use('/api/capitulos', capituloRoutes);
app.use('/api/escenas', escenaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
