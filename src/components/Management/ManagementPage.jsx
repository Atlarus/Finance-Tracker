import React, { useState } from "react";
import AccessPage from "./Access";
import CurrencyPage from "./Currency";
import FlowPage from "./Flows";

const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState("access");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex">
      <div className="fixed h-screen w-48 bg-secondary shadow-lg text-white flex flex-col">
        {/* Sidebar with tabs */}
        <ul className="flex flex-col">
          <li
            className={`text-lg font-semibold py-2 px-4 hover:bg-primary ${
              activeTab === "access" ? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick("access")}
          >
            Access
          </li>
          <li
            className={`text-lg font-semibold py-2 px-4 hover:bg-primary ${
              activeTab === "currency" ? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick("currency")}
          >
            Currency
          </li>
          <li
            className={`text-lg font-semibold py-2 px-4 hover:bg-primary ${
              activeTab === "flows" ? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick("flows")}
          >
            Flows
          </li>
          </ul>
      </div>

      <div className="flex-grow ml-64 bg-gray-100 p-4">
        {/* Tab content on the right */}
        {activeTab === "access" && <AccessPage />}
        {activeTab === "currency" && <CurrencyPage />}
        {activeTab === "flows" && <FlowPage />}
      </div>
    </div>
  );
};
export default ManagementPage;
