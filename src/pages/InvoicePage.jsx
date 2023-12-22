// InvoicePage.jsx

import React from 'react';
import InvoiceForm from './components/actions/InvoiceForm';
import InvoiceTracker from './components/actions/InvoiceTracker';

const InvoicePage = ({ invoices, setInvoiceData }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Page</h1>
      <div className="grid gap-4">
        <div>
          <InvoiceForm setInvoiceData={setInvoiceData}/>
        </div>
        <div>
          <InvoiceTracker invoices={invoices} setInvoiceData={setInvoiceData} />
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
