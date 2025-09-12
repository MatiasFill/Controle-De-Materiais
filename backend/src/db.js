import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

// Configura o pool de conexões com suas credenciais do PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "stock_db", // o nome do banco que você criou
  password: process.env.DB_PASS || "rms-1907",
  port: process.env.DB_PORT || 5432, // porta padrão do PostgreSQL
});

// Exporta o pool para ser usado nos models
export default pool;

// Se quiser usar diretamente o método query em outros arquivos:
export const query = (text, params) => pool.query(text, params);
