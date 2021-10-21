var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    user_id: String,
    qr_code: String,
    paid_status: {
        type: String,
        default: 'UNPAID',
        trim: true,
        uppercase: true
    },
    reserved_date: Date,
    order_items: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}]
});

module.exports = mongoose.model('Order', OrderSchema);