// Service 'responsável pelas regras de negócio

const prodModel = require('../models/prodModel');

// Recebe dados da camada model com a lista de produtos
const prodList = async () => {
    const prod = await prodModel.prodList();
    return prod;
};

// Procura produto por Id e se não encontrar dá product not found
const prodListById = async (id) => {
    const prod = await prodModel.prodListById(id);
    if (!prod) return { message: 'Product not found' };
    return prod;
};

const addProd = async (name) => {
    const prod = await prodModel.addProd(name);
    return prod;
};

const editProd = async (id, name) => {
    const prod = await prodModel.editProd(id, name);
    return prod;
};

module.exports = {
    prodList,
    prodListById,
    addProd,
    editProd,
};
