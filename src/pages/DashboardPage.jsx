// DashboardPage.jsx

import React from 'react';
import BudgetForecastView from './components/views/BudgetForecastView';
import CashFlowManagementView from './components/views/CashFlowManagementView';
import FinancialReportView from './components/views/FinancialReportView';

const DashboardPage = ({
  budgetData,
  cashFlowData,
  financialReportData,
}) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Add components for each section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <BudgetForecastView budgetData={budgetData} />
        <CashFlowManagementView cashFlowData={cashFlowData} />
        <FinancialReportView financialReportData={financialReportData} />
      </div>

      {/* Additional summary or charts can be added here */}
    </div>
  );
};

export default DashboardPage;
