const express = require('express');

const itemController = require('./../controllers/itemController');

const router = express.Router();

router
	.route('/')
	.post(itemController.createItem)
	.get(itemController.getAllItems);

router
	.route('/:id')
	.get(itemController.getSingleitem)
	.patch(itemController.updateItem)
	.delete(itemController.deleteItem);

module.exports = router;
