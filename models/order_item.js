var mongoose = require('mongoose');

var OrderItemSchema = new mongoose.Schema({
    order_id: String,
    item_id: String,
    amount: String,
    price: String,
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);