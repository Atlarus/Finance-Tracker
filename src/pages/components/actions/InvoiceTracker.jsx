import React, { useState } from 'react';

const InvoiceTracker = ({ invoices, setInvoiceData }) => {
  const [trackedInvoices, setTrackedInvoices] = useState(invoices || []);

  const addInvoice = (invoice) => {
    setTrackedInvoices([...trackedInvoices, invoice]);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Invoice Tracker</h2>

      {/* Display invoices in a table */}
      {trackedInvoices.length > 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {trackedInvoices.map((invoice, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{invoice.companyName}</td>
                <td className="border px-4 py-2">{invoice.clientName}</td>
                <td className="border px-4 py-2">{invoice.invoiceNumber}</td>
                <td className="border px-4 py-2">{invoice.date}</td>
                <td className="border px-4 py-2">{invoice.dueDate}</td>
                <td className="border px-4 py-2">{invoice.amount}</td>
                <td className="border px-4 py-2">{invoice.status}</td>
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
