const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchNumber: {
    type: Number,
    required: true,
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
  },

  productionData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },

  savedAt: {
    type: Date,
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

batchSchema.index({ productId: 1, batchNumber: 1 }, { unique: true });

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
