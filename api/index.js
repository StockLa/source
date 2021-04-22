const apiRoute = require('express').Router();

apiRoute.use('/api/v1/stocks', require('./stock'));

module.exports = apiRoute;
