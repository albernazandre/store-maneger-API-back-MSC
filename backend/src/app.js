const express = require('express');
const { prodRouter, saleRouter } = require('./Routes');

const app = express();
app.use(express.json());

app.use('/products', prodRouter);
app.use('/sales', saleRouter);

// não remova esse endpoint, é para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.json({ status: 'Store is already Updated!' });
});

module.exports = app;
