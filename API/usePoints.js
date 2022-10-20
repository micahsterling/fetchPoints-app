exports.getTotalPoints = function () {
  let result = 0;
  points.forEach((item) => {
    result += item.points;
  });
  return result;
};

function getPointsByPayer(payer) {
  let result = 0;
  points.forEach((item) => {
    if (item.payer == payer) {
      result += item.points;
    }
  });
  return result;
};

exports.spendPoints = function (bill) {
  // Sort points by oldest timestamps first
  points.sort(function (x, y) {
    return new Date(x.timestamp) - new Date(y.timestamp);
  });

  // Spent points array to track spending
  let spentPoints = [];

  points.forEach((item) => {
    if (bill > 0) {
      // Check if there is enough points available
      let availablePoints = getPointsByPayer(item.payer) - item.points;
      if (availablePoints >= 0) {
        // Check if current point object is more than availablePoints
        if (item.points > bill) {
          // Add point object to spentPoints array
          spentPoints.push({
            payer: item.payer,
            points: bill,
          });
          // Subtract bill from current point object
          item.points -= bill;
          bill = 0;
        } else {
          // Add transaction to spentPoints array
          spentPoints.push({
            payer: item.payer,
            points: item.points,
          });
          // Subtract from bill
          bill -= item.points;
          // Update point object after spending all points
          item.points = 0;
        }
      }
    }
  })

  let result = {}
  spentPoints.forEach(pt => {
    if (!result[pt.payer]) {
      //Initialize payer points
      result[pt.payer] = 0
    }
    // Subtract points from payer
    result[pt.payer] -= pt.points;
  })
  return result;
}