import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import capituloRoutes from './routes/capitulo.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/capitulos', capituloRoutes);

export default app;
