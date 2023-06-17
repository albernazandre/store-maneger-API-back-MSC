// Caminho para rotas

const express = require('express');
const prodControl = require('../controllers/prodControl');
const idValid = require('../middlewares/idValid');
const nameValid = require('../middlewares/prodNameValid');
const bodyValid = require('../middlewares/bodyValid');

const router = express.Router();
router.get('/:id', idValid, prodControl.prodListById);
router.put('/:id', idValid, bodyValid, nameValid, prodControl.editProd);
router.post('/', bodyValid, nameValid, prodControl.addProd);
router.get('/', prodControl.prodList);

module.exports = router;
