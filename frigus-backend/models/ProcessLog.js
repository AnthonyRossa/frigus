const mongoose = require("mongoose");

const processLogSchema = new mongoose.Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  processId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Process",
    required: true,
  },
  stepId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProcessStep",
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProcessLog", processLogSchema);