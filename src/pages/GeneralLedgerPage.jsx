// GeneralLedgerPage.js

import React, { useState, useEffect, useCallback } from 'react';

const GeneralLedgerPage = ({ ledgerData, setLedgerData }) => {
  const [editingAccountCode, setEditingAccountCode] = useState(null);
  const [newAccount, setNewAccount] = useState({
      accountCode: '',
      accountName: '',
      accountType: '',
      balance: 0,
  });

  const [editingEntryId, setEditingEntryId] = useState(null);
  const [newEntry, setNewEntry] = useState({
      id: '',
      date: '',
      description: '',
      debit: 0,
      credit: 0,
  });

  const [selectedAccountCode, setSelectedAccountCode] = useState(null);

  const calculateBalance = useCallback((entries) => {
      const total = entries.reduce((total, entry) => total + (parseFloat(entry.debit) - parseFloat(entry.credit)), 0);
      return parseFloat(total.toFixed(2));
  }, []);

    // Define the types for the dropdown
    const accountTypes = ['Asset', 'Liability', 'Equity', 'Income', 'Expense'];

    const isAccountCodeUnique = useCallback((code) => {
      return !ledgerData.some((account) => account.accountCode === code);
  }, [ledgerData]);

    const handleAddAccount = useCallback(() => {
      if (isAccountCodeUnique(newAccount.accountCode)) {
          const newAccountWithBalance = {
              ...newAccount,
              id: Date.now(),
              entries: [],
              showEntries: false,
              balance: 0,
          };
          setLedgerData([...ledgerData, newAccountWithBalance]);
          setNewAccount({
              accountCode: '',
              accountName: '',
              accountType: '',
              balance: 0,
          });
      } else {
          alert("Error: Account code must be unique.");
      }
  }, [isAccountCodeUnique, ledgerData, newAccount, setLedgerData]);

  const handleEditAccount = useCallback((accountCode) => {
    setEditingAccountCode(accountCode);
    const accountToEdit = ledgerData.find((account) => account.accountCode === accountCode);
    setNewAccount({ ...accountToEdit });
}, [ledgerData]);

    const handleUpdateAccount = useCallback(() => {
      if (isAccountCodeUnique(newAccount.accountCode)) {
          const updatedLedgerData = ledgerData.map((account) => {
              return account.accountCode === editingAccountCode
                  ? { ...newAccount, entries: account.entries, showEntries: account.showEntries, balance: calculateBalance(account.entries) }
                  : account;
          });
          setLedgerData(updatedLedgerData);
          setEditingAccountCode(null);
          setNewAccount({
              accountCode: '',
              accountName: '',
              accountType: '',
              balance: 0,
          });
      } else {
          alert("Error: Account code must be unique.");
      }
  }, [calculateBalance, editingAccountCode, isAccountCodeUnique, ledgerData, newAccount, setLedgerData]);

  const handleRemoveAccount = useCallback((accountCode) => {
    setLedgerData(ledgerData.filter((account) => account.accountCode !== accountCode));
    setEditingAccountCode(null);
    setNewAccount({
        accountCode: '',
        accountName: '',
        accountType: '',
        balance: 0,
    });
    console.log("Updated Ledger Data:", ledgerData);
}, [ledgerData, setLedgerData]);

    const handleRowClick = (accountCode) => {
        // Toggle the visibility of entries for the selected account
        const updatedLedgerData = ledgerData.map((account) => {
            if (account.accountCode === accountCode) {
                return { ...account, showEntries: !account.showEntries };
            }
            return account;
        });
        setLedgerData(updatedLedgerData);
    };

    const handleEditEntry = (entryId) => {
      setEditingEntryId(entryId);
      const entryToEdit = ledgerData.flatMap((account) => account.entries).find((entry) => entry.id === entryId);
      setNewEntry({ ...entryToEdit });
    };

    const handleUpdateEntry = () => {
      const updatedLedgerData = ledgerData.map((account) => {
          const updatedEntries = account.entries.map((entry) =>
              entry.id === editingEntryId ? newEntry : entry
          );
          return {
              ...account,
              entries: updatedEntries,
              balance: calculateBalance(updatedEntries),
          };
      });
  
      setLedgerData(updatedLedgerData);
      setEditingEntryId(null);
      setNewEntry({
          id: '',
          date: '',
          description: '',
          debit: 0,
          credit: 0,
      });
  };

  const handleRemoveEntry = (entryId) => {
    const updatedLedgerData = ledgerData.map((account) => {
        const updatedEntries = account.entries.filter((entry) => entry.id !== entryId);
        return {
            ...account,
            entries: updatedEntries,
            balance: calculateBalance(updatedEntries),
        };
    });

    setLedgerData(updatedLedgerData);
    setEditingEntryId(null);
    setNewEntry({
        id: '',
        date: '',
        description: '',
        debit: 0,
        credit: 0,
    });
};

    const handleAddEntry = () => {
      if (selectedAccountCode) {
          const updatedLedgerData = ledgerData.map((account) => {
              if (account.accountCode === selectedAccountCode) {
                  const newEntryWithId = {
                      ...newEntry,
                      id: Date.now(),
                  };
                  const updatedEntries = [...account.entries, newEntryWithId];
                  return {
                      ...account,
                      entries: updatedEntries,
                      balance: calculateBalance(updatedEntries),
                  };
              }
              return account;
          });

          setLedgerData(updatedLedgerData);
          setNewEntry({
              id: '',
              date: '',
              description: '',
              debit: 0,
              credit: 0,
          });
      } else {
          alert("Please select an account before adding an entry.");
      }
  };


  useEffect(() => {
    console.log("useEffect triggered");
    const updatedLedgerData = ledgerData.map((account) => ({
        ...account,
        balance: calculateBalance(account.entries),
    }));

    setLedgerData(updatedLedgerData);

    // Include setLedgerData in the dependency array
}, [calculateBalance, ledgerData, setLedgerData]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">General Ledger</h1>
            <table className="min-w-full bg-blue-50 border border-blue-200">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="py-2 px-4 border-b text-left">Account Code</th>
                        <th className="py-2 px-4 border-b text-left">Account Name</th>
                        <th className="py-2 px-4 border-b text-left">Account Type</th>
                        <th className="py-2 px-4 border-b text-left">Balance</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ledgerData.map((account) => (
                        <React.Fragment key={account.accountCode}>
                            <tr
                                className={`hover:bg-blue-200 transition duration-300 ${account.showEntries ? 'bg-blue-100' : ''}`}
                                onClick={() => handleRowClick(account.accountCode)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td className="py-2 px-4 border-b text-center">
                                    {editingAccountCode === account.accountCode ? (
                                        <input
                                            type="text"
                                            value={newAccount.accountCode}
                                            onChange={(e) => setNewAccount({ ...newAccount, accountCode: e.target.value })}
                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    ) : (
                                        account.accountCode
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b text-left">
                                    {editingAccountCode === account.accountCode ? (
                                        <input
                                            type="text"
                                            value={newAccount.accountName}
                                            onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    ) : (
                                        account.accountName
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b text-left">
                                    {editingAccountCode === account.accountCode ? (
                                        <select
                                            value={newAccount.accountType}
                                            onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                        >
                                            {accountTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        account.accountType
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b text-left">{parseFloat(account.balance).toFixed(2)}</td>
                                <td className="py-2 px-4 border-b">
                                    {editingAccountCode === account.accountCode ? (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleUpdateAccount}
                                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => setEditingAccountCode(null)}
                                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditAccount(account.accountCode)}
                                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleRemoveAccount(account.accountCode)}
                                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                            {account.showEntries && account.entries && account.entries.length > 0 && (
                                <tr>
                                    <td colSpan="5" className="py-2 px-4">
                                        <table className="min-w-full bg-gray-100 border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="py-2 px-4 border-b text-left">Date</th>
                                                    <th className="py-2 px-4 border-b text-left">Description</th>
                                                    <th className="py-2 px-4 border-b text-left">Debit</th>
                                                    <th className="py-2 px-4 border-b text-left">Credit</th>
                                                    <th className="py-2 px-4 border-b text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {account.entries.map((entry) => (
                                                    <tr key={entry.id}>
                                                        <td className="py-2 px-4 border-b">
                                                          {editingEntryId === entry.id ? (
                                                            <input
                                                            type="date"
                                                            value={newEntry.date}
                                                            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                                            />
                                                          ) : (
                                                          entry.date
                                                          )}
                                                        </td>
                                                        <td className="py-2 px-4 border-b">
                                                          {editingEntryId === entry.id ? (
                                                            <input
                                                            type="text"
                                                            value={newEntry.description}
                                                            onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                                            />
                                                          ) : (
                                                          entry.description
                                                          )}
                                                        </td>
                                                        <td className="py-2 px-4 border-b text-left">
                                                          {editingEntryId === entry.id ? (
                                                            <input
                                                            type="number"
                                                            value={newEntry.debit}
                                                            onChange={(e) => setNewEntry({ ...newEntry, debit: e.target.value })}
                                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                                            />
                                                          ) : (
                                                            parseFloat(entry.debit).toFixed(2)
                                                          )}
                                                        </td>
                                                        <td className="py-2 px-4 border-b text-left">
                                                          {editingEntryId === entry.id ? (
                                                            <input
                                                            type="number"
                                                            value={newEntry.credit}
                                                            onChange={(e) => setNewEntry({ ...newEntry, credit: e.target.value })}
                                                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                                                            />
                                                          ) : (
                                                            parseFloat(entry.credit).toFixed(2)
                                                          )}
                                                        </td>
                                                        <td className="py-2 px-4 border-b">
                                                          {editingEntryId === entry.id ? (
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={handleUpdateEntry}
                                                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                                                >
                                                                    Update
                                                                </button>
                                                                <button
                                                                    onClick={() => setEditingEntryId(null)}
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
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="bg-blue-50 border border-blue-200 p-4 mb-4 mt-4 rounded-md">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Add New Account</h2>
                <div className="space-y-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account Code:</label>
                        <input
                            type="text"
                            value={newAccount.accountCode}
                            onChange={(e) => setNewAccount({ ...newAccount, accountCode: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account Name:</label>
                        <input
                            type="text"
                            value={newAccount.accountName}
                            onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account Type:</label>
                        <select
                            value={newAccount.accountType}
                            onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                          <option value="" disabled selected="selected">Select an account</option>
                            {accountTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleAddAccount}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                        Add Account
                    </button>
                </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-4 mb-4 mt-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Add New Entry</h2>
                <div className="space-y-2">
                    <div>
                        {/* New dropdown for selecting the account */}
                        <label className="block text-sm font-medium text-gray-700">Select Account:</label>
                        <select
                            value={selectedAccountCode}
                            onChange={(e) => setSelectedAccountCode(e.target.value)}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled selected="selected">Select an account</option>
                            {ledgerData.map((account) => (
                                <option key={account.accountCode} value={account.accountCode}>
                                    {account.accountCode} - {account.accountName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date:</label>
                        <input
                            type="date"
                            value={newEntry.date}
                            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description:</label>
                        <input
                            type="text"
                            value={newEntry.description}
                            onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Debit:</label>
                        <input
                            type="number"
                            value={parseFloat(newEntry.debit).toFixed(2)}
                            onChange={(e) => setNewEntry({ ...newEntry, debit: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Credit:</label>
                        <input
                            type="number"
                            value={parseFloat(newEntry.credit).toFixed(2)}
                            onChange={(e) => setNewEntry({ ...newEntry, credit: e.target.value })}
                            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
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

export default GeneralLedgerPage;
