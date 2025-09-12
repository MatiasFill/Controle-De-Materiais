import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
