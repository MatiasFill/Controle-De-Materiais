import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js'; // Importa a conexão do seu arquivo db.js

import productRoutes from './routes/productRoutes.js';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Middleware: permite o uso de JSON e lida com requisições CORS
app.use(express.json());
app.use(cors());

// Conecta ao banco de dados usando a URL da variável de ambiente
pool.connect((err, client, release) => {
    if (err) {
        return console.error("Erro ao adquirir o cliente do pool", err.stack);
    }
    client.release();
    console.log("Conexão com o banco de dados bem-sucedida!");
});


// Rotas da API
app.use('/products', productRoutes);

// Configura a porta do servidor para rodar tanto localmente quanto na Vercel
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




/*
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
*/