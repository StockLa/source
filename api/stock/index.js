const stockRoute = require('express').Router();

const {stockController} = require('@controller');

stockRoute.get('/', stockController.requestStock);

module.exports = stockRoute;
