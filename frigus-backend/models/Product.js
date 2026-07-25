const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // ... other product fields ...

  // Reference to the Process model
  processes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Process",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
