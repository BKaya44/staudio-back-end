var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
    product_id: String,
    file_name: String,
});

module.exports = mongoose.model('Picture', PictureSchema);