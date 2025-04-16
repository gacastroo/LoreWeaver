import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes.js';
import personajeRoutes from './routes/personaje.routes.js';
import historiaRoutes from './routes/historia.routes.js';
import tagRoutes from './routes/tag.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/personajes', personajeRoutes);
app.use('/api/historias', historiaRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api', dashboardRoutes); // 👈 Esto ya funciona correctamente

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
