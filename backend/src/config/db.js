const { Pool } = require('pg');

// Configura o pool de conexões com suas credenciais do PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost', // ou o IP do seu servidor
  database: 'stock_db', // o nome do banco de dados que você criou
  password: 'sua_senha_do_banco',
  port: 5432, // a porta padrão do PostgreSQL
});

// Exporta o pool para que outros arquivos possam usar
module.exports = {
  query: (text, params) => pool.query(text, params),
};






/*
const { Pool } = require('pg');

// Configura o pool de conexões com suas credenciais do PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost', // ou o IP do seu servidor
  database: 'stock_db', // o nome do banco de dados que você criou
  password: 'sua_senha_do_banco',
  port: 5432, // a porta padrão do PostgreSQL
});

// Exporta o pool para que outros arquivos possam usar
module.exports = {
  query: (text, params) => pool.query(text, params),
};

*/