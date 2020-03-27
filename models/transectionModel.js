const mongoose = require('mongoose');

const transectionModel = new mongoose.Schema({
	userId: {
		type: mongoose.ObjectId,
		require: [true, "every transection must have a user"]
	},
	items: [{
		itemId: { 
			type: mongoose.ObjectId,
			require: [true, "item must have a items id"]
		}, 
		quantity: {
			type: Number,
			min: [1, "quantity must be minimum one"]
		},
	}],
	total: {
		type: Number,
		require: [true, "transection must have total price"]
	},
	paymentId: {
		type: String,
		default: null
	},
	paymentMode: {
		type: String,
		enum: ["online", "offline"],
		default: null
	},
	paymentStatus: {
		type: String,
		enum: ["success", "failed", "pending"],
		default: "pending"
	}
});

module.exports = mongoose.model('Transections', transectionModel);