// controllers/productController.js
const Product = require("../models/Product");
const Process = require("../models/Process");
const ProcessStep = require("../models/ProcessStep"); // Ensure this is imported

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'processes',
        populate: {
          path: 'steps',
          model: 'ProcessStep'
        }
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("✅ Product with populated processes:", product); // DEBUG

    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    next(error);
  }
};