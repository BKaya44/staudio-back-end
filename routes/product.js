const express = require('express');
const product = express.Router();

var productModel = require('../models/product');

//Routes for all product api responses
//'<domain>/api/product'

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

/**
 * Get specific product
 */
 product.get('/:id', async (req, res) => {
    try {
        const findProduct = await productModel.find({_id: req.params.id});
        if(Object.keys(findProduct).length !== 0){
            res.status(200);
            return res.send(findProduct);
        } else {
            res.status(400);
            return res.send({ error: { "status": 400, "message": "Product does not exist." } });
        }
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});

/**
 * Update specific product
 * Accepts the following params:
 * title: <string>
 * description: <string>
 * type: <string> 
 * price: <string> 
 */
 product.patch('/:id', async (req, res) => {
    try {
        const findProduct = await productModel.findOne({_id: req.params.id});
        if (!req.body.title && !req.body.description && !req.body.type && !req.body.price) {
            res.status(400);
            return res.send({error: {"status": 400, "message": "You need to give atleast one parameter to update this product."}});
        } else {
            if(req.body.title) findProduct.title = req.body.title;
            if(req.body.description) findProduct.description = req.body.description;
            if(req.body.type) findProduct.type = req.body.type;
            if(req.body.price) findProduct.price = req.body.price;
            await findProduct.save();
            res.status(200);
            return res.send({ "status": 200, "message": "Product has been updated." });
        }
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Product does not exist." } });
    }
});

module.exports = product