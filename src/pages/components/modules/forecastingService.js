// forecastingService.js

// Linear Regression Function
export function linearRegression(data) {
    // Assuming data is an array of objects with 'month' and 'projectedIncome' properties
    const months = data.map(entry => entry.month);
    const incomes = data.map(entry => parseFloat(entry.projectedIncome));
  
    // Calculate the linear regression coefficients
    const n = months.length;
    const xMean = months.reduce((sum, month) => sum + month, 0) / n;
    const yMean = incomes.reduce((sum, income) => sum + income, 0) / n;
  
    const numerator = months.reduce((sum, month, i) => sum + (month - xMean) * (incomes[i] - yMean), 0);
    const denominator = months.reduce((sum, month) => sum + Math.pow(month - xMean, 2), 0);
  
    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;
  
    // Forecasting the next month
    const nextMonth = months.length + 1;
    const projectedIncome = slope * nextMonth + intercept;
  
    // Return the forecasted entry
    return {
      month: `Month ${nextMonth}`,
      projectedIncome: projectedIncome.toFixed(2), // Adjust to your precision requirements
    };
  }
  