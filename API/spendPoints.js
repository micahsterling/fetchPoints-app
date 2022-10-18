function getPointsByPayer(payer) {
  let result = 0;
  points.forEach((item) => {
    if (item.payer == payer) {
      result += item.points;
    }
  });
  return result;
}

exports.getTotalPoints = function () {
  let result = 0;
  points.forEach((item) => {
    result += item.points;
  });
  return result;
};

exports.spendPoints = function (availablePoints) {
  // Sort points by oldest timestamps first
  points.sort(function (x, y) {
    return new Date(x.timestamp) - new Date(y.timestamp);
  });

  // Initialize spent points array for spending tracking
  let spentPoints = [];

  points.forEach((item) => {
    if (availablePoints > 0) {
      // Check if spending these points will make payer go negative
      let availablePoints = getPointsByPayer(item.payer) - item.points;
      if (availablePoints >= 0) {
        // Check if current point object more than enough to pay off availablePoints
        if (item.points > availablePoints) {
          // Add point object to spentPoints array
          spentPoints.push({
            payer: item.payer,
            points: availablePoints,
          });
          // Subtract availablePoints from current point object
          item.points -= availablePoints;
          availablePoints = 0;
        } else {
          // Add point object to spentPoints array
          spentPoints.push({
            payer: item.payer,
            points: item.points,
          });
          // Subtract from availablePoints
          availablePoints -= item.points;
          // Update point object after spending all points
          item.points = 0;
        }
      }
    }
  })
}