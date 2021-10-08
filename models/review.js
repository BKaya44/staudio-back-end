var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    user_id: String,
    product_id: String,
    description: String,
    star: Number,
});

module.exports = mongoose.model('Review', ReviewSchema);