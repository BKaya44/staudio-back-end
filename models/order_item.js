var mongoose = require('mongoose');

var OrderItemSchema = new mongoose.Schema({
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    amount: String,
    price: String,
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);