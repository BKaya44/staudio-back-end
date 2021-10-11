var mongoose = require('mongoose');

var DealProductSchema = new mongoose.Schema({
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    deal_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Deal'},
    price: String,
});

module.exports = mongoose.model('DealProduct', DealProductSchema);