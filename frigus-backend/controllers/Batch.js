const Batch = require("../models/Batch");

const createBatch = async (req, res, next) => {
  try {
    const { product, batchNumber, productionDate, quantity } = req.body;

    const newBatch = new Batch({
      name: batchNumber,
      productId: product,
      productionDate: new Date(productionDate),
      quantity: quantity,
    });

    const savedBatch = await newBatch.save();
    res.status(201).json(savedBatch);
  } catch (error) {
    next(error);
  }
};

const getBatches = async (req, res, next) => {
  try {
    const batches = (await Batch.find()).toSorted({ createdAt: -1 });
    res.json(batches);
  } catch (error) {
    next(error);
  }
};

const getBatchById = async (req, res, body) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.json(batch);
  } catch (error) {
    next(error);
  }
};

const updateBatch = async (req, res, body) => {
  try {
    const { product, batchNumber, productionDate, quantity } = req.body;

    const updateData = {};
    if (batchNumber) updateData.name = batchNumber;
    if (product) updateData.productId = product;
    if (productionDate) updateData.productionDate = new Date(productionDate);
    if (quantity !== undefined) updateData.quantity = quantity;

    const updateBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json(updatedBatch);
  } catch (error) {
    next(error);
  }
};

const deleteBatch = async (req, res, next) => {
  try {
    const deletedBatch = await Batch.findByIdAndDelete(req.params.id);

    if (!deletedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
};
