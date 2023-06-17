// Validacao do Id que vem do joiSchema, erro em caso de nao validacao

const { idForm } = require('./joiSchema');

const idValid = async (request, response, next) => {
    const { error } = idForm.validate(request.params);

    if (error) return response.status(422).json({ message: 'The data is not in the right form' });
    next();
};

module.exports = idValid;
