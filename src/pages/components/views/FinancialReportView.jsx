// FinancialReportView.jsx

import React from 'react';

const FinancialReportView = ({ financialReportData }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Report</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Revenue</th>
            <th className="py-2 px-4 border-b">Expenses</th>
            <th className="py-2 px-4 border-b">Net Income</th>
          </tr>
        </thead>
        <tbody>
          {financialReportData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">{entry.year}</td>
              <td className="py-2 px-4 border-b text-center">{entry.revenue}</td>
              <td className="py-2 px-4 border-b text-center">{entry.expenses}</td>
              <td className="py-2 px-4 border-b text-center">{entry.netIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReportView;
