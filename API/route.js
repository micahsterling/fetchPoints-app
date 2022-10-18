const express = require("express");
const router = express.Router();

const controller = require("./controller");

// GET points
router.get("/point", controller.getPoints);

// Add points (POST)
router.post(
  "/point",

  controller.addPoints
);

// Spend points (POST)
router.post(
  "/point/spend",

  controller.spendPoints
);

module.exports = router;