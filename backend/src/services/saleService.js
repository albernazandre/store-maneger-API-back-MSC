// Service 'responsável pelas regras de negócio

const saleModel = require('../models/saleModel');

const saleList = async () => {
    const sale = await saleModel.saleList();
    return sale;
};

const saleListById = async (id) => {
    const sale = await saleModel.saleListById(id);
    if (!sale || sale.length === 0) {
        return { message: 'Sale not found' };
    }
    return sale;
};

const addSale = async (sale) => {
    const newSale = await saleModel.addSale(sale);
    return newSale;
};

module.exports = {
    saleList,
    saleListById,
    addSale,
};
