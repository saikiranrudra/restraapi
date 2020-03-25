const Item = require("./../models/itemsModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");


exports.createItem = catchAsync(async (req, res, next) => {
	const {
		name,
		price,
		cuisine,
		rating,
		img,
		visibility	
	} = req.body;

	const item = await Item.findOne({ name, cuisine });

	if(item) {
		return next(new AppError("Item already exists", 400));
	}

	const newItem = await Item.create({
		name,
		price,
		cuisine,
		rating,
		img,
		visibility
	});

	res.status(201).json({
		status: "success",
		message: "item created successfully",
		item: newItem
	})
})

exports.getAllItems = catchAsync(async (req, res, next) => {
	const items = await Item.find({});

	res.status(200).json({
		status: "success",
		items
	})
});