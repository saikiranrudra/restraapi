const express = require('express');

const auth = require('./../middlewars/auth');
const itemController = require('./../controllers/itemController');

const router = express.Router();

router
	.route('/')
	.post(auth, itemController.createItem)
	.get(itemController.getAllItems);

router
	.route('/:id')
	.get(auth, itemController.getSingleitem)
	.patch(auth, itemController.updateItem)
	.delete(auth, itemController.deleteItem);

module.exports = router;
