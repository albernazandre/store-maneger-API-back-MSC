// Controller lida com as request HTTP do cliente e coordena as ações em res às req

const saleServ = require('../services/saleService');

const saleList = async (_request, response) => {
    const sale = await saleServ.saleList();

    return response.status(200).json(sale);
};

const saleListById = async (request, response) => {
    const { id } = request.params;
    const sale = await saleServ.saleListById(id);
    if (sale.message) return response.status(404).json(sale);
    return response.status(200).json(sale);
};

const addSale = async (request, response) => {
    const sale = request.body;
    const freshSale = await saleServ.addSale(sale);
    if (freshSale.message === 'Product not found') return response.status(404).json(freshSale);
    return response.status(201).json(freshSale);
};

module.exports = {
    saleList,
    saleListById,
    addSale,
};