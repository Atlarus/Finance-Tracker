import React from 'react';

const BudgetForecastView = ({ budgetData }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budgeting and Forecasting</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Month</th>
            <th className="py-2 px-4 border-b">Projected Income</th>
            <th className="py-2 px-4 border-b">Projected Expenses</th>
          </tr>
        </thead>
        <tbody>
          {budgetData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">{entry.month}</td>
              <td className="py-2 px-4 border-b text-center">{entry.projectedIncome}</td>
              <td className="py-2 px-4 border-b text-center">{entry.projectedExpenses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetForecastView;
