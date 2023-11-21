import React, { useState } from 'react';

const BudgetForecastPage = ({ budgetData, setBudgetData }) => {
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({ month: '', projectedIncome: '', projectedExpenses: '' });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleAddEntry = () => {
    setBudgetData([...budgetData, { ...newEntry, id: Date.now() }]);
    setNewEntry({ month: '', projectedIncome: '', projectedExpenses: '' });
  };

  const handleEditEntry = (id) => {
    setEditingId(id);
    const entryToEdit = budgetData.find((entry) => entry.id === id);
    setNewEntry({ ...entryToEdit });
  };

  const handleUpdateEntry = () => {
    setBudgetData(budgetData.map((entry) => (entry.id === editingId ? newEntry : entry)));
    setEditingId(null);
    setNewEntry({ month: '', projectedIncome: '', projectedExpenses: '' });
  };

  const handleRemoveEntry = (id) => {
    setBudgetData(budgetData.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budgeting and Forecasting</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Month</th>
            <th className="py-2 px-4 border-b">Projected Income</th>
            <th className="py-2 px-4 border-b">Projected Expenses</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgetData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <select
                    value={newEntry.month}
                    onChange={(e) => setNewEntry({ ...newEntry, month: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                ) : (
                  entry.month
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={newEntry.projectedIncome}
                    onChange={(e) => setNewEntry({ ...newEntry, projectedIncome: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.projectedIncome
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={newEntry.projectedExpenses}
                    onChange={(e) => setNewEntry({ ...newEntry, projectedExpenses: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.projectedExpenses
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingId === entry.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateEntry}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditEntry(entry.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveEntry(entry.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Add New Entry</h2>
        <div className="space-y-2">
          <div>
          <label className="block text-sm font-medium text-gray-700">Month:</label>
            <select
              value={newEntry.month}
              onChange={(e) => setNewEntry({ ...newEntry, month: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Projected Income:</label>
            <input
              type="number"
              value={newEntry.projectedIncome}
              onChange={(e) => setNewEntry({ ...newEntry, projectedIncome: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Projected Expenses:</label>
            <input
              type="number"
              value={newEntry.projectedExpenses}
              onChange={(e) => setNewEntry({ ...newEntry, projectedExpenses: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <button
            onClick={handleAddEntry}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetForecastPage;
