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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.processes || product.processes.length === 0) {
      return res.json(product);
    }

    const processIds = product.processes.map((p) => p.toString());

    const processes = await Process.find({ _id: { $in: processIds } }).populate({
      path: "steps",
      model: "ProcessStep",
    });

    const populatedProcesses = processes.map((proc) => ({
      _id: proc._id,
      name: proc.name,
      description: proc.description,
      steps: proc.steps || [],
    }));

    const responseProduct = {
      ...product.toObject(),
      processes: populatedProcesses,
    };

    res.json(responseProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    next(error);
  }
};