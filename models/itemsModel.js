const mongoose = require('mongoose');
// const validator = require('validator');

const itemModel = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "item must have name"],
	},
	price: {
		type: Number,
		require: [true, "item must have a price"]
	},
	cuisine: {
		type: String,
		require: [true, "item must have a cuisine"]
	},
	rating: {
		type: Number,
		min: [1, 'Rating must be above 1.0'],
    	max: [5, 'rating must be below 5.0'],
    	default: 5
	},
	img: {
		type: String,
		required: [true, 'Item must have image']
	},
	visibility: {
		type: 	String,
		default: 'visible'
	},
	dateOfCreation: {
		type: Date,
		default: Date.now()
	},
});

module.exports = mongoose.model('Items', itemModel);