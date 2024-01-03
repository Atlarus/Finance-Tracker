import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const FinancialReportPage = ({ ledgerData }) => {
  // State for sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // State for chart data
  const [chartData, setChartData] = useState(null);

  // Calculate balances for each account
  const calculateBalances = () => {
    const updatedLedgerData = ledgerData.map((account) => {
      const balance = account.entries.reduce((acc, entry) => acc + entry.debit - entry.credit, 0);
      return { ...account, balance };
    });

    return updatedLedgerData;
  };

  // Use the calculated balances
  const updatedLedgerData = calculateBalances();

  // Sort function
  const handleSort = (column) => {
    // Toggle the sort order if the same column is clicked
    if (column === sortColumn) {
      setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set the new column to be sorted
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Apply sorting to the ledger data
  const sortedLedgerData = [...updatedLedgerData].sort((a, b) => {
    const columnA = sortColumn ? a[sortColumn] : null;
    const columnB = sortColumn ? b[sortColumn] : null;

    if (sortOrder === 'asc') {
      return columnA < columnB ? -1 : 1;
    } else {
      return columnA > columnB ? -1 : 1;
    }
  });

  // Prepare chart data
  useEffect(() => {
    const labels = sortedLedgerData.map((account) => account.accountName);
    const balances = sortedLedgerData.map((account) => account.balance.toFixed(2));
  
    setChartData({
      labels,
      datasets: [
        {
          label: 'Balance',
          data: balances,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [sortedLedgerData]);

  // State for chart instance
  const [chartInstance, setChartInstance] = useState(null);

  // Render the chart
  useEffect(() => {
    if (chartData) {
      // Destroy existing chart instance
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create a new chart
      const ctx = document.getElementById('balanceChart').getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Save the chart instance for future destruction
      setChartInstance(newChartInstance);
    }
  }, [chartData, chartInstance]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Financial Report</h2>

      {/* Display financial data in a table */}
      <table className="min-w-full bg-gray-100 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Account Code</th>
            <th className="py-2 px-4 border-b">Account Name</th>
            <th className="py-2 px-4 border-b">Account Type</th>
            <th className="py-2 px-4 border-b">Balance</th>
          </tr>
        </thead>
        <tbody>
          {updatedLedgerData.map((account) => (
            <tr key={account.accountCode}>
              <td className="py-2 px-4 border-b">{account.accountCode}</td>
              <td className="py-2 px-4 border-b">{account.accountName}</td>
              <td className="py-2 px-4 border-b">{account.accountType}</td>
              <td className="py-2 px-4 border-b">{account.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

            {/* Display the bar chart */}
      <canvas id="balanceChart" width="400" height="200"></canvas>
    </div>
  );
};

export default FinancialReportPage;
