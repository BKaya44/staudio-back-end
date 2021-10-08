var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    user_id: String,
    qr_code: String,
    paid_status: String,
    reserved_date: Date,
});

module.exports = mongoose.model('Order', OrderSchema);