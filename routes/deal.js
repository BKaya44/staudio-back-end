const express = require('express');
const deal = express.Router();

var dealModel = require('../models/deal');
var dealProductModel = require('../models/deal_product');
var productModel = require('../models/product');
const auth = require('../middleware/auth');
const admin_check = require('../middleware/admin_check');

//Routes for all deal api responses
//'<domain>/api/deal'

/**
 * Gets all deals.
 */
deal.get("/", async (req, res) => {
    try {
        dealModel.find().populate('products').then(function(story) {
            res.status(200);
            return res.send(story);
        }).catch(function(err) { 
            res.status(400);
            return res.send({ error: { "status": 400, "message": err } });
        });
    } catch {
        res.status(404);
        return res.send({ error: { "status": 404, "message": "Something went wrong, please try again." } });
    }
});

/**
 * Gets specific deal.
 */
deal.get("/:id", async (req, res) => {
    try {
        const findDeal = await dealModel.findOne({_id: req.params.id});
        const findProductDeal = await dealProductModel.find({deal_id: findDeal._id});
        if(Object.keys(findDeal).length !== 0){
            res.status(200);
            return res.json({ deal: findDeal, products: findProductDeal });
        } else {
            res.status(400);
            return res.send({ error: { "status": 400, "message": "Deal does not exist." } });
        }
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});

/**
 * Adds new deal
 * Requires the following params:
 * name: <string>
 * description: <string>
 */
 deal.post('/', auth, admin_check, async (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Missing params." } });
    }
    try {
        const newDeal = new dealModel({
            name: req.body.name,
            description: req.body.description,
        });
        await newDeal.save();
        res.status(200);
        return res.send({ "status": "success", "message": "Deal has been added." });
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Deal could not be added." } });
    }
});

/**
 * Adds product to deal
 * Requires the following params:
 * name: <string>
 * description: <string>
 */
 deal.post('/:id', auth, admin_check, async (req, res) => {
    if (!req.body.product_id || !req.body.price) {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Missing params." } });
    }
    try {
        const findDeal = await dealModel.findOne({_id: req.params.id});
        const findProduct = await productModel.findOne({_id: req.body.product_id});
        const newDealProduct = new dealProductModel({
            product_id: findProduct._id,
            deal_id: findDeal._id,
            price: req.body.price,
        });
        await newDealProduct.save();
        res.status(200);
        return res.send({ "status": "success", "message": "Product has been added to deal." });
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Product could not be added." } });
    }
});

module.exports = deal