import React, { useState, useRef, useEffect } from "react";

const CurrencyPage = () => {
  const initialCurrencyRates = {
    EUR: 1.12,
    GBP: 1.25,
    JPY: 135.67,
  };

  const [currencyRates, setCurrencyRates] = useState(initialCurrencyRates);
  const [currenciesInTable, setCurrenciesInTable] = useState(
    Object.keys(initialCurrencyRates)
  );

  const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
  const [editModes, setEditModes] = useState({
    EUR: false,
    GBP: false,
    JPY: false,
  });

  const [newCurrency, setNewCurrency] = useState("");
  const [newRate, setNewRate] = useState("");

  const modalRef = useRef(null);

  const handleRateChange = (e, currency) => {
    const { value } = e.target;
    setCurrencyRates((prevRates) => ({
      ...prevRates,
      [currency]: parseFloat(value),
    }));
  };

  const handleAddCurrency = () => {
    if (newCurrency.trim() && newRate && !currenciesInTable.includes(newCurrency.toUpperCase())) {
      setCurrencyRates((prevRates) => ({
        ...prevRates,
        [newCurrency.toUpperCase()]: parseFloat(newRate),
      }));
      setCurrenciesInTable((prevCurrencies) => [
        ...prevCurrencies,
        newCurrency.toUpperCase(),
      ]);
      setNewCurrency("");
      setNewRate("");
      handleAddCurrencyModalClose(); // Close the modal after adding currency
    } else {
      // Handle invalid input (e.g., empty currency, rate, or duplicate currency)
    }
  };

  const handleAddCurrencyModalOpen = () => {
    setIsAddCurrencyModalOpen(true);
  };

  const handleAddCurrencyModalClose = () => {
    setIsAddCurrencyModalOpen(false);
  };

  const handleEditToggle = (currency) => {
    setEditModes((prevModes) => ({
      ...prevModes,
      [currency]: !prevModes[currency],
    }));
  };

  const handleClickOutsideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleAddCurrencyModalClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleAddCurrencyModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Set Currency Rates</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Currency</th>
            <th className="px-4 py-2">Rate</th>
            <th className="px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currencyRates).map(([currency, rate]) => (
            <tr key={currency}>
              <td className="px-4 py-2">{currency}</td>
              <td>
                <input
                  type="number"
                  name={currency}
                  value={rate}
                  onChange={(e) => handleRateChange(e, currency)}
                  disabled={!editModes[currency]}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <button
                  onClick={() => handleEditToggle(currency)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  {editModes[currency] ? "Done" : "Edit"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddCurrencyModalOpen}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Add Currency
      </button>

      {isAddCurrencyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-accent bg-opacity-50">
          <div ref={modalRef} className="bg-secondary border p-6 rounded w-96 relative">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
              Add Currency
              <span
                className="text-red-500 cursor-pointer"
                onClick={handleAddCurrencyModalClose}
              >
                &times;
              </span>
            </h3>
            <input
              type="text"
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value)}
              placeholder="Currency"
              className="w-full p-2 border mb-4 rounded"
            />
            <input
              type="number"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              placeholder="Rate"
              className="w-full p-2 border mb-4 rounded"
            />
            <button
              onClick={handleAddCurrency}
              className="bg-green-500 text-white px-4 py-2 rounded border"
            >
              Add
            </button>
          </div>
        </div>
      )}
      {/* Additional UI elements and logic for storing or using the rates */}
    </div>
  );
};

export default CurrencyPage;
