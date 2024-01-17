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
    <div className="flex flex-col">
      <div className="w-full bg-secondary shadow-lg flex items-center">
        {/* Horizontal Tabs */}
        <ul className="flex">
          <li
            className={`text-lg font-semibold px-4 hover:bg-primary ${
              activeTab === "access" ? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick("access")}
          >
            Access
          </li>
          <li
            className={`text-lg font-semibold px-4 hover:bg-primary ${
              activeTab === "currency" ? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick("currency")}
          >
            Currency
          </li>
          <li
            className={`text-lg font-semibold px-4 hover:bg-primary ${
              activeTab === "flows" ? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick("flows")}
          >
            Flows
          </li>
        </ul>
      </div>

      <div className="flex-grow bg-gray-100 p-4">
        {/* Tab content below the tabs */}
        {activeTab === "access" && <AccessPage />}
        {activeTab === "currency" && <CurrencyPage />}
        {activeTab === "flows" && <FlowPage />}
      </div>
    </div>
  );
};

export default ManagementPage;
