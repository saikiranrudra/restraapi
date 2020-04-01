const Transaction = require('./../models/transactionModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

//GET BILL
exports.getBill = catchAsync(async (req, res, next) => {
	const documents = await Transaction.find({ userId: req.userId.id });

	//If their is no document
	if (!documents) {
		return next(new AppError('No Bill Found', 400));
	}

	res.status(200).json({
		status: 'success',
		documents
	});
});

exports.getAllBill = catchAsync(async (req, res, next) => {
	const documents = await Transaction.find();

	//If their is no document
	if (!documents) {
		return next(new AppError('Their is No Bill', 400));
	}

	res.status(200).json({
		status: 'success',
		documents
	});
});


