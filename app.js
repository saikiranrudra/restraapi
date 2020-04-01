const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const cors = require('cors');

// Routers
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const transactionRoute = require('./routes/transactionRoute');
const billRoute = require('./routes/billRoute');

const app = express();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/transaction', transactionRoute);
app.use('/api/v1/bill', billRoute);

// if route dosnt exist
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// ERROR HANDELING MIDDLEWARE
app.use(globalErrorHandler);
module.exports = app;
