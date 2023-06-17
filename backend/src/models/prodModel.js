// Model é a camada em contato direto com o BD

const connect = require('./connection');

// Retorna lista de produtos da tabela mysql
const prodList = async () => {
    const [prod] = await connect.execute('SELECT * FROM products');
    return prod;
};

// Captura produto segundo param de Id em comandos no mysql
const prodListById = async (id) => {
    const [[prod]] = await connect.execute('SELECT * FROM products WHERE id = ?', [id]);
    return prod;
};

// adicionando produto no BD
const addProd = async (name) => {
    const [{ insertId }] = await connect.execute(
        'INSERT INTO products (name) VALUES (?)',
        [name],
    );
    return {
        id: insertId,
        name,
    };
};

const verifyProd = async (id) => {
    const [prod] = await connect.execute(
        'SELECT * FROM products WHERE id = ?',
        [id],
    );
    return prod.length > 0;
};

const editProd = async (id, name) => {
    if (await verifyProd(id)) {
        await connect.execute(
            'UPDATE products SET name = ? WHERE id = ?',
            [name, id],
        );
        return {
            id: Number(id),
            name,
        };
    }
    return { message: 'Product not found' };
};

module.exports = {
    prodList,   
    prodListById,
    addProd,
    editProd,
    verifyProd,
};
