const express = require('express');
const router = express.Router();

const ledgerController = require('../Controllers/LedgerController');

const {checkAuth} = require('../Middleware/Auth');

router.post('/ledgers',checkAuth, ledgerController.newLedger);
router.get('/ledgers',checkAuth, ledgerController.getbyuser);


module.exports = {
    router
};