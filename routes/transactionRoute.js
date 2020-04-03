const router = require('express').Router();
const auth = require('./../middlewars/auth');

const transactionController = require('./../controllers/transactionController.js');

router
	.route('/')
	// .get(auth, transactionController.getAllTransaction)
	.post(auth, transactionController.createTransaction);

router
	.route('/')
	.get(auth, transactionController.getTransaction);
	// .patch(auth, transactionController.updateTransaction);

module.exports = router;
