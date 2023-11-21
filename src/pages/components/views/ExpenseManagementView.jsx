import React from 'react';

const ExpenseManagementView = ({ expenseData }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Management</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenseData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">{entry.date}</td>
              <td className="py-2 px-4 border-b text-center">{entry.category}</td>
              <td className="py-2 px-4 border-b text-center">{entry.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseManagementView;
