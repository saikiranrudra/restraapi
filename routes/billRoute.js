const router = require('express').Router();
const billController = require('./../controllers/billController');

router.route('/').get(billController.getBill);

router.route('/all').get(billController.getAllBill);

module.exports = router;
