const express = require('express');
const review = express.Router();

var reviewModel = require('../models/review');

//Routes for all review api responses
//'<domain>/api/product/review'

/**
 * Get specific product
 */
 review.get('/:id', async (req, res) => {
    try {
        const findProductReview = await reviewModel.find({_id: req.params.id});
        if(Object.keys(findProductReview).length !== 0){
            res.status(200);
            return res.send(findProductReview);
        } else {
            res.status(400);
            return res.send({ error: { "status": 400, "message": "Review for this product does not exist." } });
        }
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});

/**
 * Adds new product
 * Requires the following params:
 * user_id: <string>
 * description: <string> 
 * star: <number> 
 */
 review.post('/:id', async (req, res) => {
    if (!req.body.user_id || !req.body.description || !req.body.star) {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Missing params." } });
    }
    try {
        const newProductReview = new reviewModel({
            user_id: req.body.user_id,
            product_id: req.params.id,
            description: req.body.description,
            star: req.body.star
        });
        await newProductReview.save();
        res.status(200);
        return res.send({ "status": "success", "message": "Review has been added." });
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Review could not be added." } });
    }
});

module.exports = review