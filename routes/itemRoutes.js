const express = require('express');

const Auth = require('./../middlewars/auth');
const itemController = require('./../controllers/itemController');

const router = express.Router();

router
	.route('/')
	.post(Auth, itemController.createItem)
	.get(Auth, itemController.getAllItems);

router
	.route('/:id')
	.get(Auth, itemController.getSingleitem)
	.patch(Auth, itemController.updateItem)
	.delete(Auth, itemController.deleteItem);

module.exports = router;
