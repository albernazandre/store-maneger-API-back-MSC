// Model é a camada em contato direto com o BD

const connect = require('./connection');

const saleList = async () => {
    const allQueryList = `
    SELECT
  sp.sale_id AS saleId,
  s.date,
  sp.product_id AS productId,
  sp.quantity
FROM
  sales_products sp
  INNER JOIN sales s ON sp.sale_id = s.id
ORDER BY
  sp.sale_id ASC,
  sp.product_id ASC
  `;
    const [sale] = await connect.execute(allQueryList);
    return sale;
};

const queryId = `
SELECT
  DATE_FORMAT(s.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date,
  sp.product_id AS productId,
  sp.quantity
FROM
  sales_products sp
  INNER JOIN sales s ON sp.sale_id = s.id
WHERE
  sp.sale_id = ?
ORDER BY
  sp.sale_id ASC,
  sp.product_id ASC
`;
const saleListById = async (id) => {
        const [sale] = await connect.execute(queryId, [id]);
        return sale;
};

// 
const verifyProdIdSale = async (sale) => {
  const command = 'SELECT id FROM products WHERE id = ?';
  const arrMap = sale.map(async (i) => {
    const [product] = await connect.execute(command, [i.productId]);
    return product.length === 0;
  });
  const resposta = await Promise.all(arrMap);
  return resposta.every((i) => i === false);
};

const insertSale = async (sale, insertId) => sale.map(async (elem) => {
    const { productId, quantity } = elem;
    await connect
    .execute(
'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
    [insertId, productId, quantity],
);
    return { productId, quantity };
  });

const addSaleToBD = async (sale) => {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const [{ insertId }] = await connect
  .execute('INSERT INTO sales (date) VALUES (?)', [now]);
  const allInsertSale = await insertSale(sale, insertId);
  const itemsSold = await Promise.all(allInsertSale);
  return { id: insertId, itemsSold };
};

const addSale = async (sale) => {
  if (await verifyProdIdSale(sale)) {
    return addSaleToBD(sale);
  }
    return { message: 'Product not found' };
};

module.exports = {
    saleList,
    saleListById,
    addSale,
    verifyProdIdSale,
    insertSale,
    addSaleToBD,
};
