const AppError = require('./../utils/AppError');

const handleCasteErrorDB = err => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400)
}
const handleDublicateFieldsDB = err => {

	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

	const message = `Dublicate field value: ${value} Please use another value`;
	return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map(el => el.message);

	const message = `Invalid Input data,${errors.join(', ')}`;
	return new AppError(message, 400);
}

const handleJWTError = () => new AppError("Invalid token Please log in again!", 401)

const handleJWTExpiredError = () => new AppError("Your token has expired| Please login again.", 401);

const sendErrorDev = (err, res) => {
	err.statusCode = err.statusCode || 500;
		err.status = err.status || 'error';
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';	
	// Operational, trusted error: send message to client
	if(err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		});

	// Programming or other unknown error: don't leak error details 
	} else {
		// 1) Log error
		console.error('Error', err);
		res.status(500).json({
			status: "error",
			message: "Something went very wrong"
		})
	}
} 

module.exports = (err, req, res, next) => {
	if(process.env.NODE_ENV === 'development') {
		
		sendErrorDev(err, res);


		
	} else if(process.env.NODE_ENV === 'production') {
		let error = {...err};

		if(error.name === 'CastError') error = handleCasteErrorDB(error);
		if(error.code === 11000) error = handleDublicateFieldsDB(error);
		if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
		if(error.name === 'JsonWebTokenError') error = handleJWTError();
		if(error.name === 'TokenExpiredError') error = handleJWTExpiredError();
		sendErrorProd(error, res);
	}	
	
}