import React, { useState } from 'react';

const InvoiceTracker = ({ invoices, setInvoiceData }) => {
  const [editingId, setEditingId] = useState(null);
  const [newInvoice, setNewInvoice] = useState({
    companyName: '',
    clientName: '',
    invoiceNumber: '',
    date: '',
    dueDate: '',
    amount: '',
    status: ''
  })

  const statuses = ['paid', 'pending', 'overdue', 'voided'];

  const handleAddInvoice = () => {
    setInvoiceData([...invoices, newInvoice]);
    setNewInvoice({
      companyName: '',
      clientName: '',
      invoiceNumber: '',
      date: '',
      dueDate: '',
      amount: '',
      status: ''
    })
  };

  const handleEditInvoice = (invoiceNum) => {
    setEditingId(invoiceNum);
    const invoiceToEdit = invoices.find((invoice) => invoice.invoiceNumber === invoiceNum);
    setNewInvoice({...invoiceToEdit});
  }

  const handleUpdateInvoice = () => {
    setInvoiceData(invoices.map((invoice) => (invoice.invoiceNumber === editingId ? newInvoice : invoice)));
    setEditingId(null);
    setNewInvoice({
      companyName: '',
      clientName: '',
      invoiceNumber: '',
      date: '',
      dueDate: '',
      amount: '',
      status: ''
    })
  };

  const handleRemoveInvoice = (invoiceNum) => {
    setInvoiceData(invoices.filter((invoice) => invoice.invoiceNumber !== invoiceNum));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Invoice Issued</h2>

      {/* Display invoices in a table */}
      {invoices.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Invoice</th>
              <th className="border px-4 py-2">Company Name</th>
              <th className="border px-4 py-2">Client Name</th>
              <th className="border px-4 py-2">Invoice Number</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {editingId === invoice.invoiceNumber ? (
                    <input
                      type="text"
                      value={newInvoice.companyName}
                      onChange={(e) => setNewInvoice({...newInvoice, companyName: e.target.value })}
                      className="mt-1 p-2 border rounded-md w-full"
                      />
                    ) : (
                      invoice.companyName
                    )}
                </td>
                <td className="border px-4 py-2">
                  {editingId === invoice.invoiceNumber ? (
                    <input
                      type="text"
                      value={newInvoice.clientName}
                      onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value })}
                      className="mt-1 p-2 border rounded-md w-full"
                      />
                    ) : (
                      invoice.clientName
                    )}
                </td>
                <td className="border px-4 py-2">
                  {editingId === invoice.invoiceNumber ? (
                    <input
                      type="text"
                      value={newInvoice.invoiceNumber}
                      onChange={(e) => setNewInvoice({...newInvoice, invoiceNumber: e.target.value })}
                      className="mt-1 p-2 border rounded-md w-full"
                      />
                    ) : (
                      invoice.invoiceNumber
                    )}
                </td>
                <td className="border px-4 py-2">
                  {editingId === invoice.invoiceNumber ? (
                    <input
                      type="date"
                      value={newInvoice.date}
                      onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value })}
                      className="mt-1 p-2 border rounded-md w-full"
                      />
                    ) : (
                      invoice.date
                    )}
                </td>
                <td className="border px-4 py-2">{invoice.dueDate}</td>
                <td className="border px-4 py-2">{invoice.amount}</td>
                <td className="border px-4 py-2">{invoice.status}</td>
                <td className="py-2 px-4 border-b">
                  {editingId === invoice.invoiceNumber ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdateInvoice}
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
                        onClick={() => handleEditInvoice(invoice.invoiceNumber)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveInvoice(invoice.invoiceNumber)}
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
      ) : (
        <p>No invoices yet.</p>
      )}

      {/* You can pass the addInvoice function to your InvoiceForm component */}
    </div>
  );
};

export default InvoiceTracker;
