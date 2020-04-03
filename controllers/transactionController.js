const Transaction = require('./../models/transactionModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

//GET ALL TRANSECTIONS
// exports.getAllTransaction = catchAsync(async (req, res, next) => {
// 	const documents = await Transaction.find({});

// 	//If their is no document
// 	if (!documents) {
// 		return next(new AppError('No Document Found', 400));
// 	}

// 	res.status(200).json({
// 		status: 'success',
// 		documents
// 	});
// });

//CREATE Transaction
exports.createTransaction = catchAsync(async (req, res, next) => {
	//For calculating total
	const totalPrice = req.body.items.map((el) => el.price * el.quantity);
	const totalSum = totalPrice.reduce((a, b) => a + b, 0);

	//Data for creating items
	const data = req.body.items.map((el) => {
		return {
			itemId: el._id,
			quantity: el.quantity
		};
	});

	const newTransection = await Transaction.create({
		userId: req.userId.id,
		tableNo: req.body.tableNo,
		items: data,
		total: totalSum
	});

	res.status(201).json({
		status: 'success',
		message: 'item created successfully',
		item: newTransection
	});
});

//GET Transaction
exports.getTransaction = catchAsync(async (req, res, next) => {

	const userId = req.userId.id;

	const transaction = await Transaction.find({ userId: userId });
	//If their is no document
	if (!transaction) {
		return next(new AppError('No Transaction Found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: transaction
	});
});

//UPDATE Transaction
// exports.updateTransaction = catchAsync(async (req, res, next) => {
// 	const result = await Transaction.findByIdAndUpdate(req.params.id, req.body);

// 	res.status(200).json({
// 		status: 'success',
// 		data: result
// 	});
// });
