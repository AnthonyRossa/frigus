const mongoose = require("mongoose");

const processStepSchema = new mongoose.Schema({
  param: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("ProcessStep", processStepSchema);
