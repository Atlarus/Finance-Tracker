import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Auth from './components/Auth/Auth';
import ManagementPage from './components/Management/ManagementPage';
import SettingsPage from './components/Settings/SettingsPage';
import FinancialReportPage from './components/Report/FinancialReportPage';
import VendorPage from './components/Vendors/Vendors';
import DashboardPage from './components/Dashboard/DashboardPage';
import InventoryPage from './components/Inventory/InventoryPage';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1'); // Default active tab
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const tabList = [
        "Dashboard",
        "General Ledger",
        "Accounts",
        "Reports",
        "Budgeting",
        "Inventory",
        "Vendors",
        "Documents",
        "Management",
        "Settings",
        // Add more tab names as needed
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const changeTab = (tab) => {
        setActiveTab(tab);
    };

    const handleLogin = () => {
        try{
            const sessionToken = localStorage.getItem("Token");
            if(sessionToken) {
                console.log(sessionToken);
                setIsAuthenticated(true);
            }
        } finally {

        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false)
    }

    const renderMainContent = () => {
        if (isAuthenticated) {
            // Render main content if authenticated
            switch (activeTab) {
                case 'Dashboard':
                    return <div><DashboardPage /></div>;
                case 'General Ledger':
                    return <div>Content 2</div>;
                case 'Accounts':
                    return <div>Content 3</div>;
                case 'Reports':
                    return <div>Content 4</div>;
                case 'Budgeting':
                    return <div>Content 5</div>;
                case 'Inventory':
                    return <div><InventoryPage /></div>;
                case 'Vendors':
                    return <div><VendorPage /></div>;
                case 'Documents':
                    return <div>Content 8</div>;
                case 'Management':
                    return <div><ManagementPage /></div>;
                case 'Settings':
                    return <div><SettingsPage /></div>;
                default:
                    return <div><DashboardPage /></div>;
            }
        } else {
            // Render Auth component if not authenticated
            return <Auth handleLogin={handleLogin} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-secondary p-4 shadow-lg text-white flex justify-between items-center">
                {/* Sidebar toggle button on the left */}
                <button
                    className="text-white px-2 py-1"
                    onClick={toggleSidebar}
                >
                    {isAuthenticated ? (
                        <div>
                            {isSidebarOpen ? (
                                <FontAwesomeIcon icon={faTimes} />
                            ) : (
                                <FontAwesomeIcon icon={faBars} />
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </button>
                <h1 className="flex-grow text-center">Company Name</h1>
                {/* You can add additional content on the right side of the header if needed */}
            </div>

            {/* Main Content and Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar */}
                {isSidebarOpen && isAuthenticated && (
                    <div
                        className={`bg-primary p-4 shadow-lg text-white min-h-screen w-48 transition-all ease-in-out`}
                    >
                        {/* Tabs */}
                        {tabList.map((tab) => (
                            <button
                                key={tab}
                                className={`py-2 px-4 block rounded ${
                                    activeTab === tab ? 'bg-secondary' : ''
                                }`}
                                onClick={() => changeTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                        <button
                            className={`py-2 px-4 block`}
                            onClick={() => {
                                setIsAuthenticated(false);
                            }}
                        >
                            Log Out
                        </button>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex flex-col w-full">
                    {/* Main Body Content */}
                    <div className="flex-1">{renderMainContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default App;