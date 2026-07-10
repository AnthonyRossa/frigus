const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3001;
const cors = require('cors');

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
];

mongoose.connect("mongodb://localhost:27017/frigus-database")

app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Server Error' : message,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
