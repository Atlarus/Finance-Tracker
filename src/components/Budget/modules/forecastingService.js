// Function to calculate average monthly profit
function calculateAverageProfit(data) {
  const totalProfit = data.reduce((sum, entry) => sum + (entry.profit || 0), 0);
  const averageProfit = data.length > 0 ? totalProfit / data.length : 0;
  return averageProfit;
}

// Function to perform forecasting without machine learning
export function performSimpleForecasting(data, numMonthsToPredict, selectedMonth) {
  // Filter data for the selected month
  const dataForSelectedMonth = data.filter(entry => entry.month === selectedMonth);

  // Perform forecasting based on the new structure (month and balance)
  // Adapt this part according to your forecasting logic
  const predictedProfits = Array.from({ length: numMonthsToPredict }, (_, index) => {
    // Replace this logic with your own forecasting calculation
    // For example, this uses the average balance for forecasting
    const averageBalance = dataForSelectedMonth.reduce((sum, entry) => sum + entry.balance, 0) / dataForSelectedMonth.length;
    return averageBalance;
  });

  return predictedProfits;
}
