const express = require('express');
const order = express.Router();

var orderModel = require('../models/order');
var orderItemModel = require('../models/order_item');

//Routes for all order api responses
//'<domain>/api/order'

/**
 * Gets all orders.
 */
 order.get("/", async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.status(200);
        return res.send(orders);
    } catch {
        res.status(404);
        return res.send({ error: { "status": 404, "message": "Something went wrong, please try again." } });
    }
});

/**
 * Gets all orders from specific user.
 */
 order.get("/user/:id", async (req, res) => {
    try {
        const findOrder = await orderModel.find({user_id: req.params.id});
        if(Object.keys(findOrder).length !== 0){
            res.status(200);
            return res.send(findOrder);
        } else {
            res.status(400);
            return res.send({ error: { "status": 400, "message": "User has no orders or user does not exist." } });
        }
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});

/**
 * Gets specific orders.
 */
 order.get("/:id", async (req, res) => {
    try {
        const findOrder = await orderModel.findOne({_id: req.params.id});
        if(Object.keys(findOrder).length !== 0){
            const findProductOrder = await orderItemModel.find({ order_id: findOrder._id});
            res.status(200);
            return res.json({order: findOrder, items: findProductOrder});
        } else {
            res.status(400);
            return res.send({ error: { "status": 400, "message": "Order does not exist." } });
        }
    } catch {
        res.status(401);
        return res.send({ error: { "status": 401, "message": "Unauthorized." } });
    }
});

/**
 * Update specific order
 * Accepts the following params:
 * paid_status: <string>
 */
order.patch('/:id', async (req, res) => {
    try {
        const findOrder = await orderModel.findOne({_id: req.params.id});
        if (!req.body.paid_status) {
            res.status(400);
            return res.send({error: {"status": 400, "message": "You need to give atleast one parameter to update this order."}});
        } else {
            findOrder.paid_status = req.body.paid_status;
            await findOrder.save();
            res.status(200);
            return res.send({ "status": 200, "message": "Order has been updated." });
        }
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Order does not exist." } });
    }
});

module.exports = order