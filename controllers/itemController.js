const Item = require('./../models/itemsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.createItem = catchAsync(async (req, res, next) => {
	const { name, price, cuisine, rating, img, visibility } = req.body;

	const item = await Item.findOne({ name, cuisine });

	if (item) {
		return next(new AppError('Item already exists', 400));
	}

	const newItem = await Item.create({
		name,
		price,
		cuisine,
		rating,
		img,
		visibility
	});
	console.log(req.headers);
	res.status(201).json({
		status: 'success',
		message: 'item created successfully',
		item: newItem
	});
});

exports.getAllItems = catchAsync(async (req, res, next) => {
	const items = await Item.find({});

	res.status(200).json({
		status: 'success',
		items
	});
});

exports.getSingleitem = catchAsync(async (req, res, next) => {
	const result = await Item.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: result
	});
});

exports.updateItem = catchAsync(async (req, res, next) => {
	const result = await Item.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({
		status: 'success',
		data: result
	});
});

exports.deleteItem = catchAsync(async (req, res, next) => {
	const result = await Item.findOneAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: result
	});
});
