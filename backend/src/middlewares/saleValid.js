// validando vendas e retornando errors message

const { saleForm } = require('./joiSchema');

const saleValidating = async (request, response, next) => {
  try {
    const err = request.body
      .map((i) => saleForm.validate(i).error)
      .filter((error) => error);

    if (err.some((error) => error.message.includes('be greater than'))) {
      throw new Error(err.find((error) => error.message.includes('be greater than')).message);
    }

    if (err.some((error) => error.message.includes('is required'))) {
      throw new Error(err.find((error) => error.message.includes('is required')).message);
    }

    next();
  } catch (error) {
    return response.status(422).json({ message: error.message });
  }
};

module.exports = saleValidating;
