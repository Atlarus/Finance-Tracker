// DashboardPage.jsx

import React from 'react';
import BankReconciliationView from './components/views/BankReconciliationView';
import BudgetForecastView from './components/views/BudgetForecastView';
import CashFlowManagementView from './components/views/CashFlowManagementView';
import ExpenseManagementView from './components/views/ExpenseManagementView';
import FinancialReportView from './components/views/FinancialReportView';
import GeneralLedgerView from './components/views/GeneralLedgerView';
import AccountsView from './components/views/AccountsView';

const DashboardPage = ({
  accountsData,
  bankReconciliationData,
  budgetData,
  cashFlowData,
  expenseData,
  financialReportData,
  ledgerData,
}) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Add components for each section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <AccountsView accountsData={accountsData} />
        <BankReconciliationView bankReconciliationData={bankReconciliationData} />
        <BudgetForecastView budgetData={budgetData} />
        <CashFlowManagementView cashFlowData={cashFlowData} />
        <ExpenseManagementView expenseData={expenseData} />
        <FinancialReportView financialReportData={financialReportData} />
        <GeneralLedgerView ledgerData={ledgerData} />
      </div>

      {/* Additional summary or charts can be added here */}
    </div>
  );
};

export default DashboardPage;
