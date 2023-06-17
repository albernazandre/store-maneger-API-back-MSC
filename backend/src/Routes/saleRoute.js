const express = require('express');
const idValid = require('../middlewares/idValid');
const saleControl = require('../controllers/saleControl');
const saleValid = require('../middlewares/saleValid');
const saleBodyValid = require('../middlewares/saleBodyValid');

const router = express.Router();

router.get('/:id', idValid, saleControl.saleListById);
router.post('/', saleBodyValid, saleValid, saleControl.addSale);
router.get('/', saleControl.saleList);

module.exports = router;
