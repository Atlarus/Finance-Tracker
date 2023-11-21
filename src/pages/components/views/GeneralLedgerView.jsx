import React from "react";

const GeneralLedgerPage = ({ledgerData}) => {
    return(
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">General Ledger</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Debit</th>
            <th className="py-2 px-4 border-b">Credit</th>
          </tr>
        </thead>
        <tbody>
          {ledgerData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-2 px-4 border-b text-center">{entry.date}</td>
              <td className="py-2 px-4 border-b text-center">{entry.description}</td>
              <td className="py-2 px-4 border-b text-center">{entry.debit}</td>
              <td className="py-2 px-4 border-b text-center">{entry.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
}

export default GeneralLedgerPage;