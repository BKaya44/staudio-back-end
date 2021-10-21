const express = require('express');
const order = express.Router();

var orderModel = require('../models/order');
var orderItemModel = require('../models/order_item');
const auth = require('../middleware/auth');
const admin_check = require('../middleware/admin_check');

//Routes for all order api responses
//'<domain>/api/order'

/**
 * Gets all orders.
 */
 order.get("/", auth, admin_check, async (req, res) => {
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
 order.get("/user/:id", auth, async (req, res) => {
    try {
        if (req.user_type === "USER" && req.user_id !== req.params.id) {
            res.status(401);
            return res.send({ error: { "status": 400, "message": "Unauthorized." } });
        }
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
 order.get("/:id", auth, async (req, res) => {
    try {
        const findOrder = await orderModel.findOne({_id: req.params.id});
        if (req.user_type === "USER" && req.user_id !== findOrder.user_id) {
            res.status(401);
            return res.send({ error: { "status": 400, "message": "Unauthorized." } });
        }
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
order.patch('/:id', auth, admin_check, async (req, res) => {
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

/**
 * Adds new order
 * Returns new order id
 */
 order.post('/', auth, async (req, res) => {
    try {
        let qrcode = (Math.random() + 1).toString(36).substring(2);
        const newOrder = new orderModel({
            user_id: req.user_id,
            qr_code: qrcode,
            reserved_date: Date.now(),
        });
        await newOrder.save();
        res.status(200);
        return res.send({ "status": "success", "order_id": newOrder._id });
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Order could not be created." } });
    }
});

/**
 * Adds item to order
 * Requires the following params:
 * item_id: <string>
 * amount: <string>
 * price: <string>
 */
 order.post('/item/:id', auth, async (req, res) => {
    if (!req.body.item_id || !req.body.amount || !req.body.price) {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Missing params." } });
    }
    try {
        const newOrderItem = new dealProductModel({
            order_id: req.params.id,
            item_id: req.body.item_id,
            amount: req.body.amount,
            price: req.body.price,
        });
        await newOrderItem.save();
        res.status(200);
        return res.send({ "status": "success", "message": "Item has been added to the order." });
    } catch {
        res.status(400);
        return res.send({ error: { "status": 400, "message": "Item could not be added to order." } });
    }
});

module.exports = order