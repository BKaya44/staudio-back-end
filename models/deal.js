var mongoose = require('mongoose');

var DealSchema = new mongoose.Schema({
    name: String,
    description: String,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'DealProduct'}]
});

module.exports = mongoose.model('Deal', DealSchema);