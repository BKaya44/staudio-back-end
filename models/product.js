var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    price: String,
});

module.exports = mongoose.model('Product', ProductSchema);