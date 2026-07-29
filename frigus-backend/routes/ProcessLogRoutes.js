const express = require("express");
const router = express.Router();
const { createProcessLog, getProcessLogsByBatch } = require("../controllers/ProcessLogController");

router.post("/", createProcessLog);
router.get("/batch/:batchId", getProcessLogsByBatch);

module.exports = router;