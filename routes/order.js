const express = require('express');
const order = express.Router();

var orderModel = require('../models/order');

//Routes for all order api responses
//'<domain>/api/order'

module.exports = order