const { body, validationResult } = require("express-validator");
const activePoints = require("./usePoints");

exports.getPoints = function (req, res) {
  let result = {};
  points.forEach(num => {
    if (!result[num.payer]) {
      // Intitialize payer points
      result[num.payer] = 0;
    }
    // Add points to payer
    result[num.payer] += num.points;
  });
  res.json(result);
};

exports.addPoints = function (req, res) {
  //Displays validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  req.body.points = parseInt(req.body.points)
  points.push(req.body);
  res.json(points);
}

exports.spendPoints = function (req, res) {
  //Displays validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let availablePoints = parseInt(req.body.points);
  //Check point balance
  if (activePoints.getTotalPoints() < availablePoints) {
    res.status(402).json({ message: "Not enough points" })
    return;
  }

  let result = activePoints.spendPoints(availablePoints);
  res.json(result);
}

exports.validate = (method) => {
  switch (method) {
    case "addPoints": {
      return [
        body("payer", "payer string not found").isString(),
        body("points", "points must be a positive number").isInt({ gt: 0 }),
        body("timestamp", "timestamp must be a date").isISO8601(),
      ];
    }
    case "spendPoints": {
      return [
        body("points", "points must be a positive number").isInt({ gt: 0 }),
      ];
    }
  }
};