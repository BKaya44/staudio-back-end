const express = require('express');
const product = express.Router();

var productModel = require('../models/product');

//Routes for all product api responses

/**
 * Return all existing products
 */
 product.get("/", async (req, res) => {
    try {
        res.status(200);
        const findProduct = await productModel.find();
        return res.send(findProduct);
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});

/**
 * Adds new product
 * Requires the following params:
 * title: <string>
 * description: <string>
 * type: <string> 
 * price: <string> 
 */
 product.post('/', async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.type || !req.body.price) {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Missing params." } });
    }
    try {
        const newProduct = new productModel({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price
        });
        await newProduct.save();
        res.status(200);
        return res.send({ "status": "success", "message": "Product has been added." });
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Product could not be added." } });
    }
});

module.exports = product