const express = require("express");
const { celebrate, Joi } = require("celebrate");
const {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
} = require("../controllers/Batch");

const router = express.Router();

// get all
router.get("/", getBatches);

//get by id
router.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required().messages({
        "string.hex": "Invalid ID format",
        "string.lenght": "ID must be 24 characters",
      }),
    }),
  }),
  getBatchById,
);

//Post new
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      product: Joi.string()
        .required()
        .messages({ "any.required": "Product ID is required" }),
      batchNumber: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .required()
        .messages({ "any.required": "Batch Number is required" }),
      productionDate: Joi.date()
        .iso()
        .required()
        .messages({ "date.base": "Valid date required" }),
      quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({ "number.base": "Quantity is required" }),
    }),
  }),
  createBatch,
);

// PATCH update
router.patch(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object()
      .keys({
        product: Joi.string().optional(),
        batchNumber: Joi.string().min(2).max(50).trim().optional(),
        productionDate: Joi.date().iso().optional(),
        quantity: Joi.number().integer().min(1).optional(),
      })
      .min(1)
      .messages({ "object.min": "At least one field to update" }),
  }),
  updateBatch,
);

// DELETE
router.delete(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteBatch,
);

module.exports = router;
