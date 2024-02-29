// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  company_symbol: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: Date, default: Date.now },
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = {orderModel};
