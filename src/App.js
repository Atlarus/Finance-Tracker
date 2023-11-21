// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AccountsPage from './pages/AccountsPage';
import InvoicePage from './pages/InvoicePage';
import BankReconciliationPage from './pages/BankReconciliationPage';
import BudgetForecastPage from './pages/BudgetForecastPage';
import CashFlowManagementPage from './pages/CashFlowManagementPage';
import DashboardPage from './pages/DashboardPage';
import ExpenseManagementPage from './pages/ExpenseManagementPage';
import FinancialReportPage from './pages/FinancialReportPage';
import GeneralLedgerPage from './pages/GeneralLedgerPage';

const App = () => {
    // Dummy ledger data for demonstration
    const dummyLedgerData = [
      { id: 1, date: '2023-01-01', description: 'Transaction 1', debit: 100, credit: 0 },
      { id: 2, date: '2023-01-02', description: 'Transaction 2', debit: 0, credit: 50 },
      // Add more dummy data as needed
    ];
  
    // Dummy accounts data for demonstration
    const dummyAccountsData = [
      { id: 1, name: 'Vendor A', amount: 500, type: 'Payable' },
      { id: 2, name: 'Customer B', amount: 200, type: 'Receivable' },
      // Add more dummy data as needed
    ];

    // Dummy expense data for demonstration
    const dummyExpenseData = [
        { id: 1, date: '2023-01-03', category: 'Office Supplies', amount: 50 },
        { id: 2, date: '2023-01-04', category: 'Travel', amount: 120 },
        // Add more dummy data as needed
    ];

    // Dummy budget data for demonstration
    const dummyBudgetData = [
        { id: 1, month: 'January', projectedIncome: 5000, projectedExpenses: 3000 },
        { id: 2, month: 'February', projectedIncome: 5500, projectedExpenses: 3200 },
        // Add more dummy data as needed
    ];

    // Dummy financial report data for demonstration
    const dummyFinancialReportData = [
        { id: 1, year: 2022, revenue: 60000, expenses: 45000, netIncome: 15000 },
        { id: 2, year: 2021, revenue: 55000, expenses: 40000, netIncome: 15000 },
        // Add more dummy data as needed
    ];

    // Dummy cash flow data for demonstration
    const dummyCashFlowData = [
        { id: 1, date: '2023-01-05', transactionType: 'Income', amount: 2000 },
        { id: 2, date: '2023-01-06', transactionType: 'Expense', amount: 800 },
        // Add more dummy data as needed
    ];

    // Dummy bank reconciliation data for demonstration
    const dummyBankReconciliationData = [
        { id: 1, date: '2023-01-07', transactionType: 'Deposit', amount: 3000, status: 'Cleared' },
        { id: 2, date: '2023-01-08', transactionType: 'Withdrawal', amount: 1500, status: 'Pending' },
        // Add more dummy data as needed
    ];

    // Dummy data for invoices
    const dummyInvoices = [
        { 
            companyName: 'ABC Inc.', 
            clientName: 'Client A', 
            invoiceNumber: 'INV001', 
            date: '2023-11-21', 
            dueDate: '2023-12-01', 
            amount: 1000, 
            status: 'pending'
        },
        { 
            companyName: 'XYZ Ltd.', 
            clientName: 'Client B', 
            invoiceNumber: 'INV002', 
            date: '2023-11-21', 
            dueDate: '2023-12-05', 
            amount: 1500, 
            status: 'paid'
        },
        { 
            companyName: '123 Corp.', 
            clientName: 'Client C', 
            invoiceNumber: 'INV003', 
            date: '2023-11-22', 
            dueDate: '2023-12-10', 
            amount: 1200, 
            status: 'pending'
        },
        { 
            companyName: 'DEF Enterprises', 
            clientName: 'Client D', 
            invoiceNumber: 'INV004', 
            date: '2023-11-22', 
            dueDate: '2023-12-15', 
            amount: 2000, 
            status: 'overdue'
        },
        // Add more dummy invoices as needed
    ];
  
    // State to store ledger and accounts data
    const [ledgerData, setLedgerData] = useState([]);
    const [accountsData, setAccountsData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [budgetData, setBudgetData] = useState([]);
    const [financialReportData, setFinancialReportData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [bankReconciliationData, setBankReconciliationData] = useState([]);
    const [invoiceData, setInvoiceData] = useState([]);
  
    // Example: Fetch ledger and accounts data from a server (simulated with useEffect)
    useEffect(() => {
      // Simulating data fetching - replace with actual API calls
      setLedgerData(dummyLedgerData);
      setAccountsData(dummyAccountsData);
      setExpenseData(dummyExpenseData);
      setBudgetData(dummyBudgetData);
      setFinancialReportData(dummyFinancialReportData);
      setCashFlowData(dummyCashFlowData);
      setBankReconciliationData(dummyBankReconciliationData);
      setInvoiceData(dummyInvoices);
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    return (
        <Router>
            <div className="font-sans min-h-screen flex flex-col">
                <nav className="bg-gray-800 text-white p-4">
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="hover:text-gray-300">Dashboard</Link></li>
                        <li><Link to="/invoice" className="hover:text-gray-300">Invoice</Link></li>
                        <li><Link to="/ledger" className="hover:text-gray-300">General Ledger</Link></li>
                        <li><Link to="/accounts" className="hover:text-gray-300">Accounts</Link></li>
                        <li><Link to="/expenses" className="hover:text-gray-300">Expense Management</Link></li>
                        <li><Link to="/budget" className="hover:text-gray-300">Budgeting and Forecasting</Link></li>
                        <li><Link to="/report" className="hover:text-gray-300">Financial Report</Link></li>
                        <li><Link to="/cashflow" className="hover:text-gray-300">Cash Flow Management</Link></li>
                        <li><Link to="/bank-reconciliation" className="hover:text-gray-300">Bank Reconciliation</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" exact>
                        <Route index element={<DashboardPage
                            accountsData={accountsData}
                            invoices={invoiceData}
                            bankReconciliationData={bankReconciliationData}
                            budgetData={budgetData}
                            cashFlowData={cashFlowData}
                            expenseData={expenseData}
                            financialReportData={financialReportData}
                            ledgerData={ledgerData}
                        />} />
                        <Route path="/accounts" element={<AccountsPage accountsData={accountsData} setAccountsData={setAccountsData} />} />
                        <Route path="/ledger" element={<GeneralLedgerPage ledgerData={ledgerData} setLedgerData={setLedgerData} />} />
                        <Route path="/expenses" element={<ExpenseManagementPage expenseData={expenseData} setExpenseData={setExpenseData} />} />
                        <Route path="/budget" element={<BudgetForecastPage budgetData={budgetData} setBudgetData={setBudgetData} />} />
                        <Route path="/report" element={<FinancialReportPage financialReportData={financialReportData} setFinancialReportData={setFinancialReportData} />} />
                        <Route path="/cashflow" element={<CashFlowManagementPage cashFlowData={cashFlowData} setCashFlowData={setCashFlowData} />} />
                        <Route path="/bank-reconciliation" element={<BankReconciliationPage bankReconciliationData={bankReconciliationData} setBankReconciliationData={setBankReconciliationData} />} />
                        <Route path="/invoice" element={<InvoicePage invoices={invoiceData} setInvoiceData={setInvoiceData} />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
