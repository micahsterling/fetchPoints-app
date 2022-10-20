const express = require("express");
const router = express.Router();

const controller = require("./controller");

// GET points
router.get("/balance", controller.getPoints);

// Add points (POST)
router.post(
  "/points",
  controller.validate("addPoints"),
  controller.addPoints
);

// Spend points (POST)
router.post(
  "/points/spent",
  controller.validate("spendPoints"),
  controller.spendPoints
);

module.exports = router;