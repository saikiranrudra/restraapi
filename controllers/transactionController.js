const Transaction = require('./../models/transactionModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

//GET ALL DOCUEMNTS
exports.getAllTransaction = catchAsync(async (req, res, next) => {
	const documents = await Transaction.find({});

	//If their is no document
	if (!documents) {
		return next(new AppError('No Document Found', 400));
	}

	res.status(200).json({
		status: 'success',
		documents
	});
});

//CREATE DOCUMENT
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

	const newItem = await Transaction.create({
		userId: req.userId.id,
		items: data,
		total: totalSum
	});

	res.status(201).json({
		status: 'success',
		message: 'item created successfully',
		item: newItem
	});
});

//GET DOCUMENT
exports.getTransaction = catchAsync(async (req, res, next) => {
	const documents = await Transaction.findById(req.params.id);

	//If their is no document
	if (!documents) {
		return next(new AppError('No Document Found', 400));
	}

	res.status(200).json({
		status: 'success',
		data: documents
	});
});

//UPDATE DOCUMENT
exports.updateTransaction = catchAsync(async (req, res, next) => {
	const result = await Transaction.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({
		status: 'success',
		data: result
	});
});
