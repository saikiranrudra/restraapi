const router = require('express').Router();
const auth = require('./../middlewars/auth');

const transactionController = require('./../controllers/transactionController.js');

router
	.route('/')
	.get(auth, transactionController.getAllDocuments)
	.post(auth, transactionController.createDocument);

router
	.route('/:id')
	.get(auth, transactionController.getAllDocument)
	.patch(auth, transactionController.updateDocument);

module.exports = router;
