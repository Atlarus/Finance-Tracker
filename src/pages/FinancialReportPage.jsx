import React, { useState } from 'react';

const FinancialReportPage = ({ financialReportData, setFinancialReportData }) => {
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({ year: '', revenue: '', expenses: '', netIncome: '' });

  const years = Array.from({ length: 10 }, (_, index) => 2023 - index); // Generate an array of 10 years starting from 2023

  const handleAddEntry = () => {
    setFinancialReportData([...financialReportData, { ...newEntry, id: Date.now() }]);
    setNewEntry({ year: '', revenue: '', expenses: '', netIncome: '' });
  };

  const handleEditEntry = (id) => {
    setEditingId(id);
    const entryToEdit = financialReportData.find((entry) => entry.id === id);
    setNewEntry({ ...entryToEdit });
  };

  const handleUpdateEntry = () => {
    setFinancialReportData(financialReportData.map((entry) => (entry.id === editingId ? newEntry : entry)));
    setEditingId(null);
    setNewEntry({ year: '', revenue: '', expenses: '', netIncome: '' });
  };

  const handleRemoveEntry = (id) => {
    setFinancialReportData(financialReportData.filter((entry) => entry.id !== id));
  };


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
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {financialReportData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <select
                    value={newEntry.year}
                    onChange={(e) => setNewEntry({ ...newEntry, year: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : (
                  entry.year
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={newEntry.revenue}
                    onChange={(e) => setNewEntry({ ...newEntry, revenue: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.revenue
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={newEntry.expenses}
                    onChange={(e) => setNewEntry({ ...newEntry, expenses: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.expenses
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={newEntry.netIncome}
                    onChange={(e) => setNewEntry({ ...newEntry, netIncome: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.netIncome
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
            <label className="block text-sm font-medium text-gray-700">Year:</label>
            <select
              value={newEntry.year}
              onChange={(e) => setNewEntry({ ...newEntry, year: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Revenue:</label>
            <input
              type="number"
              value={newEntry.revenue}
              onChange={(e) => setNewEntry({ ...newEntry, revenue: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expenses:</label>
            <input
              type="number"
              value={newEntry.expenses}
              onChange={(e) => setNewEntry({ ...newEntry, expenses: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Net Income:</label>
            <input
              type="number"
              value={newEntry.netIncome}
              onChange={(e) => setNewEntry({ ...newEntry, netIncome: e.target.value })}
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

export default FinancialReportPage;
