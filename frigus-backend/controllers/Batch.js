const Batch = require("../models/Batch");

const createBatch = async (req, res, next) => {
  try {
    const { product, batchNumber, productionDate, quantity } = req.body;

    const newBatch = new Batch({
      batchNumber: Number(batchNumber),
      productId: product,
      productionDate: new Date(productionDate),
      quantity: Number(quantity),
    });

    const savedBatch = await newBatch.save();
    res.status(201).json(savedBatch);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Batch number already exists for this product.",
      });
    }
    next(error);
  }
};

const getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find();
    const sortedBatches = batches.toSorted((a, b) => b.createdAt - a.createdAt);
    res.json(sortedBatches);
  } catch (error) {
    next(error);
  }
};

const getBatchById = async (req, res, next) => {
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

const updateBatch = async (req, res, next) => {
  try {
    const {
      product,
      batchNumber,
      productionDate,
      quantity,
      productionData,
    } = req.body;

    const updateData = {};
    if (batchNumber !== undefined) updateData.batchNumber = batchNumber;
    if (product) updateData.productId = product;
    if (productionDate) updateData.productionDate = new Date(productionDate);
    if (quantity !== undefined) updateData.quantity = Number(quantity);
    if (productionData !== undefined) {
      updateData.productionData = productionData;
      updateData.savedAt = new Date();
    }

    const updatedBatchResult = await Batch.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedBatchResult) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json(updatedBatchResult);
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
