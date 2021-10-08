var mongoose = require('mongoose');

var DealSchema = new mongoose.Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('Deal', DealSchema);