// O schema do id procura validar o id passado, no caso numero, inteiro e positivo

const joi = require('joi');

const idForm = joi.object({
    id: joi.number().integer().positive().required(),
});

// validacao de formato de nome de prouto

const prodNameForm = joi.object({
    name: joi.string().min(5).required(),
}).messages({
    'string.min': '"name" length must be at least 5 characters long',
    'any.required': '"name" is required',
});

// validacao de formato de nome de venda

const saleForm = joi.object({
    productId: joi.number().integer().positive().required()
    .min(1)
    .messages({
        'any.required': '"productId" is required',
        'number.positive': '"quantity" must be a positive number',
        'number.base': '"quantity" must be a number',
        'number.min': '"quantity" must be greater than or equal to 1',
    }),
    quantity: joi.number().integer().positive().required()
    .messages({
        'any.required': '"quantity" is required',
        'number.positive': '"quantity" must be greater than or equal to 1',
        'number.base': '"quantity" must be a number',
    }),
});

module.exports = {
    idForm,
    prodNameForm,
    saleForm,
};
