import React, { useState, useEffect } from 'react';
import regression from 'regression';

const BudgetingForecastPage = ({ ledgerData }) => {
  // Extract unique years from ledgerData
  const uniqueYears = [...new Set(ledgerData.flatMap(account => account.entries.map(entry => entry.date.substring(0, 4))))];

  // State to track the selected year
  const [selectedYear, setSelectedYear] = useState(uniqueYears[0]); // Set the default selected year

  const [regressionData, setRegressionData] = useState(null);

  // Filter data based on the selected year
  const filteredData = ledgerData.filter(account =>
    account.entries.some(entry => entry.date.startsWith(selectedYear))
  );

  // Calculate overall totals for the selected year
  const overallDebit = filteredData.reduce((total, account) =>
    total + account.entries.reduce((acc, entry) => entry.date.startsWith(selectedYear) ? acc + entry.debit : acc, 0), 0);

  const overallCredit = filteredData.reduce((total, account) =>
    total + account.entries.reduce((acc, entry) => entry.date.startsWith(selectedYear) ? acc + entry.credit : acc, 0), 0);

  // Calculate budget by month
  const budgetByMonth = filteredData.reduce((result, account) => {
    account.entries.forEach(entry => {
      const entryYear = entry.date.substring(0, 4); // Extract year from the entry date
      if (entryYear === selectedYear) {
        const month = entry.date.substring(0, 7);
        if (!result[month]) {
          result[month] = { debit: 0, credit: 0, balance: 0 }; // Set balance as 0, not "0"
        }
        result[month].debit += parseFloat(entry.debit); // Ensure debit is treated as a number
        result[month].credit += parseFloat(entry.credit); // Ensure credit is treated as a number
        result[month].balance = (result[month].debit - result[month].credit).toFixed(2);
      }
    });
    return result;
  }, {});

  // Calculate overall balance for the selected year
  const overallBalance = (overallDebit - overallCredit).toFixed(2); // Use toFixed for precision

  const calculateRegression = () => {
    const entries = filteredData.flatMap(account => account.entries);
    const revenueData = entries
      .filter(entry => entry.category === 'Revenue')
      .map(entry => [new Date(entry.date).getTime(), entry.credit]);
  
    const expenseData = entries
      .filter(entry => entry.category === 'Expense')
      .map(entry => [new Date(entry.date).getTime(), entry.debit]);
  
    console.log('Revenue Data:', revenueData);
    console.log('Expense Data:', expenseData);
  
    const revenueResult = regression.linear(revenueData);
    const expenseResult = regression.linear(expenseData);
  
    console.log('Revenue Result:', revenueResult);
    console.log('Expense Result:', expenseResult);
  
    setRegressionData({
      revenue: revenueResult,
      expense: expenseResult,
    });
  };

  useEffect(() => {
    calculateRegression();
  }, [selectedYear]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Budget Overview</h1>

            {/* Year Selection Dropdown */}
            <label className="block mb-4">
                Select Year:
                <select
                    className="border border-gray-300 p-2 ml-2"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {uniqueYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </label>

            {/* Budget by Month Table */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4">Month</th>
                        <th className="py-2 px-4">Total Debit</th>
                        <th className="py-2 px-4">Total Credit</th>
                        <th className="py-2 px-4">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(budgetByMonth).map(month => (
                        <tr key={month}>
                            <td className="py-2 px-4">{month}</td>
                            <td className="py-2 px-4">{parseFloat(budgetByMonth[month].debit).toFixed(2)}</td>
                            <td className="py-2 px-4">{parseFloat(budgetByMonth[month].credit).toFixed(2)}</td>
                            <td className="py-2 px-4">{parseFloat(budgetByMonth[month].balance).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Overall Budget Totals */}
            <h2 className="text-2xl font-bold mt-8">Overall Totals</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4">Total Debit</th>
                        <th className="py-2 px-4">Total Credit</th>
                        <th className="py-2 px-4">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4">{parseFloat(overallDebit).toFixed(2)}</td>
                        <td className="py-2 px-4">{parseFloat(overallCredit).toFixed(2)}</td>
                        <td className="py-2 px-4">{overallBalance}</td>
                    </tr>
                </tbody>
            </table>
            {regressionData && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold">Regression Analysis</h2>
                <p>Revenue Forecast: {regressionData.revenue.equation}</p>
                <p>Expense Forecast: {regressionData.expense.equation}</p>
              </div>
            )}
        </div>
    );
};

export default BudgetingForecastPage;
