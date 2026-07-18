const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3001;
const cors = require("cors");
const batchRoutes = require("./routes/Batch");

const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];

mongoose
  .connect("mongodb://localhost:27017/frigus-database")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error", err));

app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

app.use("/batches", batchRoutes);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CelebrateError") {
    const message = err.details ? err.details[0].message : err.message;
    return res.status(400).json({
      message: "Validation Error",
      details: message,
    });
  }

  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Server Error" : message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
