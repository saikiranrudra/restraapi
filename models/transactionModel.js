const mongoose = require('mongoose');

const transactionModel = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		require: [true, 'every transection must have a user']
	},
	tableNo: {
		type: Number,
		require: [true, 'every transaction must belongs to any table']
	},
	items: [
		{
			itemId: {
				type: mongoose.Schema.Types.ObjectId,
				require: [true, 'item must have a items id']
			},
			quantity: {
				type: Number,
				min: [1, 'quantity must be minimum one']
			}
		}
	],
	total: {
		type: Number,
		require: [true, 'transection must have total price']
	},
	paymentId: {
		type: String,
		default: null
	},
	paymentMode: {
		type: String,
		enum: ['online', 'offline']
	},
	paymentStatus: {
		type: String,
		enum: ['success', 'pending'],
		default: 'pending'
	}
});

module.exports = mongoose.model('Transaction', transactionModel);
