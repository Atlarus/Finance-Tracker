import React, { useState } from 'react';

const BankReconciliationPage = ({ bankReconciliationData, setBankReconciliationData }) => {
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({ date: '', transactionType: '', amount: '', status: '' });

  const transactionTypes = ['Deposit', 'Withdrawal', 'Transfer', 'Other']; // You can customize the types based on your application
  const statuses = ['Cleared', 'Pending', 'Reconciled']; // You can customize the statuses based on your application

  const handleAddEntry = () => {
    setBankReconciliationData([...bankReconciliationData, { ...newEntry, id: Date.now() }]);
    setNewEntry({ date: '', transactionType: '', amount: '', status: '' });
  };

  const handleEditEntry = (id) => {
    setEditingId(id);
    const entryToEdit = bankReconciliationData.find((entry) => entry.id === id);
    setNewEntry({ ...entryToEdit });
  };

  const handleUpdateEntry = () => {
    setBankReconciliationData(bankReconciliationData.map((entry) => (entry.id === editingId ? newEntry : entry)));
    setEditingId(null);
    setNewEntry({ date: '', transactionType: '', amount: '', status: '' });
  };

  const handleRemoveEntry = (id) => {
    setBankReconciliationData(bankReconciliationData.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Bank Reconciliation</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Transaction Type</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bankReconciliationData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.date
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <select
                    value={newEntry.transactionType}
                    onChange={(e) => setNewEntry({ ...newEntry, transactionType: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    {transactionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                ) : (
                  entry.transactionType
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.amount
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <select
                    value={newEntry.status}
                    onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  entry.status
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
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transaction Type:</label>
            <select
              value={newEntry.transactionType}
              onChange={(e) => setNewEntry({ ...newEntry, transactionType: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>Select Transaction Type</option>
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount:</label>
            <input
              type="number"
              value={newEntry.amount}
              onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <select
              value={newEntry.status}
              onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
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

export default BankReconciliationPage;
