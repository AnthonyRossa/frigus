const mongoose = require("mongoose");
const ProcessStep = require("./ProcessStep");

const processSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  steps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProcessStep",
      required: true,
    },
  ],
  description: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Process", processSchema);
