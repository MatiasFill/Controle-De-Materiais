const db = require('../config/db');

exports.getProducts = async (req, res) => {
    try {
        // As consultas no PostgreSQL retornam o resultado em "result.rows"
        const result = await db.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

exports.addProduct = async (req, res) => {
    const { name, sku, quantity, price } = req.body;
    try {
        // A sintaxe para placeholders no PostgreSQL é '$1, $2, ...'
        // E usamos 'RETURNING *' para obter os dados do produto inserido
        const result = await db.query(
            'INSERT INTO products (name, sku, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, sku, quantity, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, sku, quantity, price } = req.body;
    try {
        // A contagem de linhas afetadas fica em "result.rowCount"
        const result = await db.query(
            'UPDATE products SET name = $1, sku = $2, quantity = $3, price = $4 WHERE id = $5 RETURNING *',
            [name, sku, quantity, price, productId]
        );
        if (result.rowCount === 0) {
            return res.status(404).send('Produto não encontrado.');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await db.query('DELETE FROM products WHERE id = $1', [productId]);
        if (result.rowCount === 0) {
            return res.status(404).send('Produto não encontrado.');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).send('Erro interno do servidor.');
    }
};
