import React, { useState } from 'react';

const GeneralLedgerPage = ({ ledgerData, setLedgerData }) => {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    description: '',
    debit: '',
    credit: '',
  });

  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEntry = () => {
    setLedgerData((prevData) => [...prevData, { ...formData, id: Date.now().toString() }]);
    setFormData({
      id: '',
      date: '',
      description: '',
      debit: '',
      credit: '',
    });
  };

  const handleEditEntry = (id) => {
    setEditingId(id);
    const entryToEdit = ledgerData.find((entry) => entry.id === id);
    if (entryToEdit) {
      setFormData(entryToEdit);
    }
  };

  const handleUpdateEntry = () => {
    setLedgerData((prevData) =>
      prevData.map((entry) => (entry.id === editingId ? { ...formData, id: editingId } : entry))
    );
    setFormData({
      id: '',
      date: '',
      description: '',
      debit: '',
      credit: '',
    });
    setEditingId(null);
  };

  const handleRemoveEntry = (id) => {
    setLedgerData((prevData) => prevData.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">General Ledger</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Debit</th>
            <th className="py-2 px-4 border-b">Credit</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ledgerData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.date
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.description
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={formData.debit}
                    onChange={(e) => setFormData({ ...formData, debit: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.debit
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={formData.credit}
                    onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                ) : (
                  entry.credit
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
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

      {/* Form for adding/editing entries */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Add Entry</h2>
        <form className="space-y-2">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="debit" className="block text-sm font-medium text-gray-700">
              Debit:
            </label>
            <input
              type="number"
              id="debit"
              name="debit"
              value={formData.debit}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="credit" className="block text-sm font-medium text-gray-700">
              Credit:
            </label>
            <input
              type="number"
              id="credit"
              name="credit"
              value={formData.credit}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <button
            type="button"
            onClick={handleAddEntry}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralLedgerPage;
