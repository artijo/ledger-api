const express = require('express');
const router = express.Router();

const ledgerController = require('../Controllers/LedgerController');

const {checkAuth} = require('../Middleware/Auth');

router.post('/ledgers',checkAuth, ledgerController.newLedger);
router.get('/ledgers',checkAuth, ledgerController.getbyuser);
router.get('/ledgers/overview',checkAuth, ledgerController.overview);
router.get('/ledgers/thismonth',checkAuth, ledgerController.getthismonth);


module.exports = {
    router
};