const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  },

  productId: {
    type: String,
    required: true,
    trim: true,
  },

  quantity: {
    type: Number,
    required: true,
    trim: true,
  },

  productionDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
