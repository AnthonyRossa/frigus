const ProcessLog = require("../models/ProcessLog");

exports.createProcessLog = async (req, res, next) => {
  try {
    const { batchId, processId, stepId, value } = req.body;

    const newLog = new ProcessLog({
      batchId,
      processId,
      stepId,
      value,
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    next(error);
  }
};

exports.getProcessLogsByBatch = async (req, res, next) => {
  try {
    const logs = await ProcessLog.find({ batchId: req.params.batchId })
      .populate({
        path: "processId",
        select: "name",
      })
      .populate({
        path: "stepId",
        select: "param unit",
      });

    res.json(logs);
  } catch (error) {
    next(error);
  }
};