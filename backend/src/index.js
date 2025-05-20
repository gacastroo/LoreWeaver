import app from './app.js';
import cors from 'cors'


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
