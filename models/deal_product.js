var mongoose = require('mongoose');

var DealProductSchema = new mongoose.Schema({
    product_id: String,
    deal_id: String,
    price: String,
});

module.exports = mongoose.model('DealProduct', DealProductSchema);