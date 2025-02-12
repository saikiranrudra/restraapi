const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}

exports.loginUser = catchAsync(async (req, res, next) => {
	const { name, email, position } = req.body;
	
	// 1) Check if email and password exist
	if(!email || !name) {
		return next(new AppError('Please provide email and name', 400))
	};

	// 2) Check if user exist
	const user = await User.findOne({ email, name });

	if(user) {
		const token = signToken({id: user._id});
		return res.status(200).json({
			status: "success",
			name: user.name,
			position: user.position,
			token
		})
	}

	// 3) if user dosnt exist
	if(position) {
		const newUser = await User.create({ email, name, position });
		const token = signToken({id: newUser._id});
		return res.status(201).json({
			status: "success",
			name: newUser.name,
			token,
			position: newUser.position
		})	
	}

	const newUser = await User.create({ email, name });
	const token = signToken({id: newUser._id});
	res.status(201).json({
		status: "success",
		name: newUser.name,
		token,
		position: newUser.position,
	})	
	
})