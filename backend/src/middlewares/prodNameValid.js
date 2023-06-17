// validacao com o schema do campo name

const { prodNameForm } = require('./joiSchema');

const prodNameValid = async (request, response, next) => {
    const { error } = prodNameForm.validate(request.body);
    if (error && error.message === '"name" is not allowed to be empty') {
 return response.status(400).json(
        { message: error.message },
        ); 
    }
    if (error && error.message === '"name" length must be at least 5 characters long') {
    return response.status(422).json(
            { message: error.message },
            );
    }
    next();
};

module.exports = prodNameValid;
