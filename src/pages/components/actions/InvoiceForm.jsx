import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    clientName: '',
    invoiceDate: '',
    items: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, {}] });
  };

  const removeItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create Invoice</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Date:</label>
          <input
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Dynamic item inputs */}
        {formData.items.map((item, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Item Description:</label>
            <input
              type="text"
              value={item.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
            <label className="block text-sm font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              value={item.quantity || 0}
              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
            <label className="block text-sm font-medium text-gray-700">Unit Price:</label>
            <input
              type="number"
              value={item.unitPrice || 0}
              onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              Remove Item
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>

      {/* PDF download link */}
      <PDFDownloadLink document={<InvoiceTemplate formData={formData} />} fileName="invoice.pdf">
        {({ loading }) => (
          <button
            className={`${
              loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
            } text-white py-2 px-4 rounded-md`}
            disabled={loading}
          >
            {loading ? 'Loading document...' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default InvoiceForm;
