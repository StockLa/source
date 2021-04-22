const apiRoute = require('express').Router();

apiRoute.use('/api/v1/stock', require('./stock'));

module.exports = apiRoute;
