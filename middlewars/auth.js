const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
	const token = req.header.token;
	//if token dosnt exist
	if(!token) return next(new AppError("unAuthorized access", 401));

	// if token exist
	const data = await jwt.verify(token, process.env.TOKEN_SECRET)
	req.userId = data.id; //every protected route have req.userId defined
	if(data) {
		return next();	
	} else {
		next(new AppError("unAuthorized access Invalid token", 401));
	}
	
}