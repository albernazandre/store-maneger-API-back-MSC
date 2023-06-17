// validation de nome requerido

const bodyValid = async (request, response, next) => {
    if (request.body.name === undefined) {
        return response.status(400).json({ message: '"name" is required' });
    }
    next(); 
};

module.exports = bodyValid;
