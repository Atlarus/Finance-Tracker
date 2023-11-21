import React, { useState } from 'react';

const AccountsPage = ({ accountsData, setAccountsData }) => {
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({ name: '', amount: '', type: '' });

  // Define the types for the dropdown
  const types = ['Receivable', 'Payable', 'Other'];

  const handleAddEntry = () => {
    setAccountsData([...accountsData, { ...newEntry, id: Date.now() }]);
    setNewEntry({ name: '', amount: '', type: '' });
  };

  const handleEditEntry = (id) => {
    setEditingId(id);
    const entryToEdit = accountsData.find((entry) => entry.id === id);
    setNewEntry({ ...entryToEdit });
  };

  const handleUpdateEntry = () => {
    setAccountsData(accountsData.map((entry) => (entry.id === editingId ? newEntry : entry)));
    setEditingId(null);
    setNewEntry({ name: '', amount: '', type: '' });
  };

  const handleRemoveEntry = (id) => {
    setAccountsData(accountsData.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Accounts Payable and Receivable</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Vendor/Customer</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accountsData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="text"
                    value={newEntry.name}
                    onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.name
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="text"
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
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                ) : (
                  entry.type
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
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={newEntry.name}
              onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount:</label>
            <input
              type="text"
              value={newEntry.amount}
              onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type:</label>
            <select
              value={newEntry.type}
              onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
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

export default AccountsPage;
