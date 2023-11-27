// Function to calculate average monthly profit
function calculateAverageProfit(data) {
  const totalProfit = data.reduce((sum, entry) => sum + entry.profit, 0);
  return totalProfit / data.length;
}

// Function to perform forecasting without machine learning
export function performSimpleForecasting(budgetData, numMonthsToPredict) {
  const averageProfit = calculateAverageProfit(budgetData);

  // Create an array of predicted profits using the average
  const predictedProfits = Array.from({ length: numMonthsToPredict }, (_, index) => averageProfit);

  return predictedProfits;
}