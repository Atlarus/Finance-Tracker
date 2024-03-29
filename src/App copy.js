// App.js

import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InvoicePage from './components/Documents/Invoice/InvoicePage';
import BudgetForecastPage from './components/Budget/BudgetForecastPage';
import FinancialReportPage from './components/Report/FinancialReportPage';
import GeneralLedgerPage from './components/Ledger/GeneralLedgerPage';
import InventoryPage from './components/Inventory/InventoryPage';
import VendorPage from './components/Vendors/Vendors';
import Auth from './components/Auth/Auth';
import SettingsPage from './components/Settings/SettingsPage';
import ManagementPage from './components/Management/ManagementPage';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

        // State to store ledger and accounts data
        const [ledgerData, setLedgerData] = useState([
            { accountCode: '1010', accountName: 'Cash', accountType: 'Asset', balance: 0.00, entries: [
                { id: 1, date: '2023-01-01', description: 'Transaction 1', debit: 100.00, credit: 0.00 },
                { id: 3, date: '2023-01-03', description: 'Transaction 3', debit: 50.00, credit: 0.00 },
                { id: 15, date: '2023-01-15', description: 'Transaction 15', debit: 75.00, credit: 0.00 },
                { id: 16, date: '2023-01-16', description: 'Transaction 16', debit: 0.00, credit: 30.00 },
            ] },
            { accountCode: '1020', accountName: 'Accounts Receivable', accountType: 'Asset', balance: 0, entries: [
                { id: 2, date: '2023-01-02', description: 'Transaction 2', debit: 0, credit: 50 },
                { id: 4, date: '2023-01-04', description: 'Transaction 4', debit: 80, credit: 0 },
                { id: 17, date: '2023-01-17', description: 'Transaction 17', debit: 0, credit: 90 },
                { id: 18, date: '2023-01-18', description: 'Transaction 18', debit: 120, credit: 0 },
            ] },
            { accountCode: '1030', accountName: 'Prepaid Expenses', accountType: 'Asset', balance: 0, entries: [
                { id: 5, date: '2023-01-05', description: 'Transaction 5', debit: 30, credit: 0 },
                { id: 19, date: '2023-01-19', description: 'Transaction 19', debit: 0, credit: 40 },
                { id: 20, date: '2023-01-20', description: 'Transaction 20', debit: 60, credit: 0 },
            ] },
            { accountCode: '2010', accountName: 'Accounts Payable', accountType: 'Liability', balance: 0, entries: [
                { id: 6, date: '2023-01-06', description: 'Transaction 6', debit: 0, credit: 60 },
                { id: 21, date: '2023-01-21', description: 'Transaction 21', debit: 80, credit: 0 },
                { id: 22, date: '2023-01-22', description: 'Transaction 22', debit: 0, credit: 45 },
            ] },
            { accountCode: '2020', accountName: 'Loans Payable', accountType: 'Liability', balance: 0, entries: [
                { id: 7, date: '2023-01-07', description: 'Transaction 7', debit: 100, credit: 0 },
                { id: 23, date: '2023-01-23', description: 'Transaction 23', debit: 0, credit: 75 },
                { id: 24, date: '2023-01-24', description: 'Transaction 24', debit: 60, credit: 0 },
            ] },
            { accountCode: '3010', accountName: "Owner's Equity", accountType: 'Equity', balance: 0, entries: [
                { id: 8, date: '2023-01-08', description: 'Transaction 8', debit: 120, credit: 0 },
                { id: 25, date: '2023-01-25', description: 'Transaction 25', debit: 0, credit: 150 },
                { id: 26, date: '2023-01-26', description: 'Transaction 26', debit: 0, credit: 80 },
            ] },
            { accountCode: '4010', accountName: 'Web Development Services', accountType: 'Revenue', balance: 0, entries: [
                { id: 9, date: '2023-01-09', description: 'Transaction 9', debit: 200, credit: 0 },
                { id: 27, date: '2023-01-27', description: 'Transaction 27', debit: 0, credit: 180 },
                { id: 28, date: '2023-01-28', description: 'Transaction 28', debit: 250, credit: 0 },
            ] },
            { accountCode: '4020', accountName: 'Software Solutions', accountType: 'Revenue', balance: 0, entries: [
                { id: 10, date: '2023-01-10', description: 'Transaction 10', debit: 150, credit: 0 },
                { id: 29, date: '2023-01-29', description: 'Transaction 29', debit: 0, credit: 120 },
                { id: 30, date: '2023-01-30', description: 'Transaction 30', debit: 180, credit: 0 },
            ] },
            { accountCode: '5010', accountName: 'Office Rent', accountType: 'Expenses', balance: 0, entries: [
                { id: 11, date: '2023-01-11', description: 'Transaction 11', debit: 0, credit: 80 },
                { id: 31, date: '2023-01-31', description: 'Transaction 31', debit: 0, credit: 100 },
                { id: 32, date: '2023-02-01', description: 'Transaction 32', debit: 120, credit: 0 },
            ] },
            { accountCode: '5020', accountName: 'Utilities', accountType: 'Expenses', balance: 0, entries: [
                { id: 12, date: '2023-01-12', description: 'Transaction 12', debit: 0, credit: 40 },
                { id: 33, date: '2023-02-02', description: 'Transaction 33', debit: 0, credit: 30 },
                { id: 34, date: '2023-02-03', description: 'Transaction 34', debit: 50, credit: 0 },
            ] },
            { accountCode: '5030', accountName: 'Marketing Expenses', accountType: 'Expenses', balance: 0, entries: [
                { id: 13, date: '2023-01-13', description: 'Transaction 13', debit: 0, credit: 60 },
                { id: 35, date: '2023-02-04', description: 'Transaction 35', debit: 80, credit: 0 },
                { id: 36, date: '2023-02-05', description: 'Transaction 36', debit: 0, credit: 45 },
            ] },
            { accountCode: '5040', accountName: 'Employee Salaries', accountType: 'Expenses', balance: 0, entries: [
                { id: 14, date: '2023-01-14', description: 'Transaction 14', debit: 0, credit: 100 },
                { id: 37, date: '2023-02-06', description: 'Transaction 37', debit: 120, credit: 0 },
                { id: 38, date: '2023-02-07', description: 'Transaction 38', debit: 0, credit: 90 },
            ] },
            // Add more dummy data as needed
    ]);
    const [invoiceData, setInvoiceData] = useState([
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
    ]);

    const getLogin = () => {
        // Check if user is logged in from the session
        const companyID = sessionStorage.getItem("CID");
        const userID = sessionStorage.getItem("UID");
        
        if (companyID && userID) {
            setLoggedIn(true);
            console.log("found");
        }
    }

    useEffect(() => {
        getLogin();
    }, []);

    return (
        <Router>
            {loggedIn ? (
            <div className="font-mono min-h-screen flex flex-col">
                <nav className="bg-gradient-to-br from-primary to-secondary p-4 shadow-lg">
                    <ul className="flex space-x-4">
                        <li><Link to="/">General Ledger</Link></li>
                        <li><Link to="/documents">Documents</Link></li>
                        <li><Link to="/budget">Budgeting and Forecasting</Link></li>
                        <li><Link to="/report">Financial Report</Link></li>
                        <li><Link to="/inventory">Inventory</Link></li>
                        <li><Link to="/vendors">Vendors</Link></li>
                        <li><Link to="/management">Management</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to="/auth">Login</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" exact element={<GeneralLedgerPage ledgerData={ledgerData} setLedgerData={setLedgerData} />} />
                    <Route path="/budget" element={<BudgetForecastPage ledgerData={ledgerData} />} />
                    <Route path="/report" element={<FinancialReportPage ledgerData={ledgerData} />} />
                    <Route path="/documents" element={<InvoicePage invoices={invoiceData} setInvoiceData={setInvoiceData} />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/vendors" element={<VendorPage />} />
                    <Route path="/management" element={<ManagementPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/login" element={<Auth />} />
                </Routes>
            </div>
            ) : (
                <div className="font-mono min-h-screen flex flex-col">
                    <nav className="bg-gradient-to-br from-primary to-secondary p-4 shadow-lg">
                        <ul className="flex space-x-4">
                            <li><Link to="/login">Finance
                            </Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/login" element={<Auth setLoggedIn={setLoggedIn} />} />
                    </Routes>
                </div>
            )}
        </Router>
    );
};

export default App;
