import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AddExpenseModal from './AddExpenseModal';

const MainLayout = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Determine title based on current path
    const getTitle = () => {
        switch (location.pathname) {
            case '/dashboard': return 'Dashboard';
            case '/dashboard/transactions': return 'Transactions';
            case '/dashboard/analytics': return 'AI Analytics';
            case '/dashboard/budget': return 'Budget Planning';
            case '/dashboard/settings': return 'Settings';
            default: return 'ExpenseTracker';
        }
    };

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header title={getTitle()} onAddExpense={() => setIsModalOpen(true)} />
                <div className="page-content animate-fade-in">
                    <Outlet />
                </div>
            </div>
            {isModalOpen && <AddExpenseModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default MainLayout;
