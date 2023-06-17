// Controller lida com as request HTTP do cliente e coordena as ações em res às req

const prodServ = require('../services/prodService');

const prodList = async (_request, response) => {
    const prod = await prodServ.prodList();

    return response.status(200).json(prod);
};

const prodListById = async (request, response) => {
    const { id } = request.params;

    const prod = await prodServ.prodListById(id);
    if (prod.message) return response.status(404).json(prod);
    return response.status(200).json(prod);
};

const addProd = async (request, response) => {
    const { name } = request.body;
    const prod = await prodServ.addProd(name);
    return response.status(201).json(prod);
};

const editProd = async (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    const prod = await prodServ.editProd(id, name);
    if (prod.message === 'Product not found') return response.status(404).json(prod);
    return response.status(200).json(prod);
};

module.exports = {
    prodList,
    prodListById,
    addProd,
    editProd,
};
