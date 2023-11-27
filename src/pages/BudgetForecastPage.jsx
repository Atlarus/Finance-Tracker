// Import necessary modules or libraries
import React, { useState, useEffect } from 'react';
import { performSimpleForecasting } from './components/modules/forecastingService';

const BudgetForecastPage = ({ ledgerData }) => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [predictedProfits, setPredictedProfits] = useState([]);

  // Function to get the current month
  function getCurrentMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding padding for single-digit months
    return `${year}-${month}`;
  }

  // Function to get unique months from ledgerData
  function getUniqueMonths() {
    const uniqueMonths = new Set();
    ledgerData.forEach(account => {
      account.entries.forEach(entry => {
        const month = entry.date.substring(0, 7);
        uniqueMonths.add(month);
      });
    });
    return Array.from(uniqueMonths);
  }

  // Function to calculate total for the selected month
  function calculateMonthlyTotal() {
    return ledgerData.map(account => {
      const entriesForMonth = account.entries.filter(entry => entry.date.startsWith(selectedMonth));
      const monthlyTotal = entriesForMonth.reduce((acc, entry) => acc + entry.debit - entry.credit, 0);
      return {
        accountName: account.accountName,
        totalWithCarryOver: monthlyTotal,
      };
    });
  }

  // Function to handle month selection change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Function to generate budget display for the selected month in a table
  const generateBudgetTable = () => {
    const months = getUniqueMonths();

    return (
      <div>
        <label htmlFor="monthSelector" className="mr-2">Select Month:</label>
        <select
          id="monthSelector"
          className="border rounded p-1"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map(month => (
            <option key={month} value={month}>{`Budget for ${month}`}</option>
          ))}
        </select>

        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Account</th>
              <th className="py-2 px-4 border-b">{`Budget for ${selectedMonth}`}</th>
            </tr>
          </thead>
          <tbody>
            {calculateMonthlyTotal().map(({ accountName, totalWithCarryOver }) => (
              <tr key={accountName} className="hover:bg-gray-100 transition duration-300">
                <td className="py-2 px-4 border-b">{accountName}</td>
                <td className="py-2 px-4 border-b">{totalWithCarryOver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Function to get future months
function getFutureMonths(startMonth, numMonths) {
  const months = [];
  let currentMonth = new Date(startMonth);

  for (let i = 0; i < numMonths; i++) {
    months.push(`${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}`);
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  return months;
}

useEffect(() => {
  // Perform forecasting using the simple calculation
  const numMonthsToPredict = 12; // Adjust the number of months as needed
  const simplePredictions = performSimpleForecasting(ledgerData, numMonthsToPredict);
  setPredictedProfits(simplePredictions);
}, [selectedMonth, ledgerData]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Budgeting and Forecasting</h1>
      {generateBudgetTable()}

            {/* Add a chart or display the predictedProfits as needed */}
      {/* Example: Display predicted profits for each month */}
      {/* Display predicted profits using the simple calculation */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Predicted Profits for the Next 12 Months</h2>
        <ul>
          {predictedProfits.map((prediction, index) => (
            <li key={index}>{`Month ${index + 1}: ${prediction.toFixed(2)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetForecastPage;