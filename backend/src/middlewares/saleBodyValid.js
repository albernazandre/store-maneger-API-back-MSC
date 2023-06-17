// validacao de se há o id e quantidade de produtos na venda

const saleBodyValid = async (request, response, next) => {
    if (!request.body[0].quantity && request.body[0].quantity !== 0) {
        return response.status(400).json({ message: '"quantity" is required' });
    }
    if (!request.body[0].productId) {
        return response.status(400).json({ message: '"productId" is required' });
    }
    next();
};

module.exports = saleBodyValid;