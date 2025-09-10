const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const port = 3000;

// Middleware para permitir requisições de diferentes origens (CORS) e
// para analisar o corpo das requisições JSON.
app.use(cors());
app.use(express.json());

// Roteamento para a API de produtos
app.use('/api/products', productRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
