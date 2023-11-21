import React from 'react';

const AccountsView = ({ accountsData }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Accounts Payable and Receivable</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Vendor/Customer</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Type</th>
          </tr>
        </thead>
        <tbody>
          {accountsData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">{entry.name}</td>
              <td className="py-2 px-4 border-b text-center">{entry.amount}</td>
              <td className="py-2 px-4 border-b text-center">{entry.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsView;