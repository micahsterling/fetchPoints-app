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

  points.push(req.body);
  res.json(points);
}

exports.spendPoints = function (req, res) {


  let availablePoints = parseInt(req.body.points);
  //Check point balance
  if (activePoints.getTotalPoints() < availablePoints) {
    res.status(402).json({ message: "Not enough points" })
    return;
  }

  let result = activePoints.spendPoints(availablePoints);
  res.json(result);
}

