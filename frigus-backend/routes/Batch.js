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
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  getBatchById,
);

//Post new
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      product: Joi.string().required(),
      batchNumber: Joi.number().min(1).required(),
      productionDate: Joi.date().iso().required(),
      quantity: Joi.number().integer().min(1).required(),
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
        batchNumber: Joi.number().min(1).optional(),
        productionDate: Joi.date().iso().optional(),
        quantity: Joi.number().integer().min(1).optional(),
      })
      .min(1),
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
