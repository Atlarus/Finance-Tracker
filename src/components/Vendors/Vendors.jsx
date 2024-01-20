import React, { useState, useEffect } from "react";

const VendorPage = () => {
  // Example array of vendor data (replace with your actual data or fetch from an API)
  const [vendors, setVendors] = useState([
    {
      companyName: "Vendor A Inc.",
      contactPerson: "Alice Smith",
      address: "123 Main St, City A",
      phoneNumber: "555-1111",
      email: "alice@vendorA.com",
      taxID: "A123456",
      paymentTerms: "Net 30",
      productsServices: "Goods",
      invoices: [
        { invoiceNumber: "VA001", invoiceDate: "2024-01-01", dueDate: "2024-01-31", totalAmount: 1000 },
        // Add more invoices for Vendor A
      ],
    },
    {
      companyName: "Vendor B Ltd.",
      contactPerson: "Bob Johnson",
      address: "456 Oak St, City B",
      phoneNumber: "555-2222",
      email: "bob@vendorB.com",
      taxID: "B789012",
      paymentTerms: "Net 45",
      productsServices: "Services",
      invoices: [
        { invoiceNumber: "VB001", invoiceDate: "2024-02-01", dueDate: "2024-02-29", totalAmount: 1500 },
        // Add more invoices for Vendor B
      ],
    },
    {
      companyName: "Vendor C Co.",
      contactPerson: "Charlie Brown",
      address: "789 Pine St, City C",
      phoneNumber: "555-3333",
      email: "charlie@vendorC.com",
      taxID: "C345678",
      paymentTerms: "Net 60",
      productsServices: "Goods and Services",
      invoices: [
        { invoiceNumber: "VC001", invoiceDate: "2024-03-01", dueDate: "2024-03-31", totalAmount: 2000 },
        // Add more invoices for Vendor C
      ],
    },
    {
      companyName: "Vendor D Corp.",
      contactPerson: "David White",
      address: "101 Cedar St, City D",
      phoneNumber: "555-4444",
      email: "david@vendorD.com",
      taxID: "D901234",
      paymentTerms: "Net 45",
      productsServices: "Services",
      invoices: [
        { invoiceNumber: "VD001", invoiceDate: "2024-04-01", dueDate: "2024-04-30", totalAmount: 1200 },
        // Add more invoices for Vendor D
      ],
    },
    {
      companyName: "Vendor E Enterprises",
      contactPerson: "Eva Black",
      address: "202 Elm St, City E",
      phoneNumber: "555-5555",
      email: "eva@vendorE.com",
      taxID: "E567890",
      paymentTerms: "Net 30",
      productsServices: "Goods",
      invoices: [
        { invoiceNumber: "VE001", invoiceDate: "2024-05-01", dueDate: "2024-05-31", totalAmount: 1800 },
        // Add more invoices for Vendor E
      ],
    },
  ]);

  // useEffect to simulate data fetching from an API
  useEffect(() => {
    // Simulate fetching data from an API and updating the state
    // Replace this with your actual data fetching logic
    // For example, you might use Axios, Fetch, or another data fetching library
    // axios.get("api/vendors").then((response) => setVendors(response.data));
  }, []); // Empty dependency array to mimic componentDidMount

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Vendor Information</h1>
      <table className="w-full bg-white border shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Company Name</th>
            <th className="py-2 px-4 border">Contact Person</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Tax ID</th>
            <th className="py-2 px-4 border">Payment Terms</th>
            <th className="py-2 px-4 border">Products/Services</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{vendor.companyName}</td>
              <td className="py-2 px-4 border">{vendor.contactPerson}</td>
              <td className="py-2 px-4 border">{vendor.address}</td>
              <td className="py-2 px-4 border">{vendor.phoneNumber}</td>
              <td className="py-2 px-4 border">{vendor.email}</td>
              <td className="py-2 px-4 border">{vendor.taxID}</td>
              <td className="py-2 px-4 border">{vendor.paymentTerms}</td>
              <td className="py-2 px-4 border">{vendor.productsServices}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorPage;