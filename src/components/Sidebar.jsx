import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PieChart, WalletCards, Settings, LogOut, Wallet, List } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/dashboard/transactions', label: 'Transactions', icon: <List size={20} /> },
        { path: '/dashboard/analytics', label: 'AI Analytics', icon: <PieChart size={20} /> },
        { path: '/dashboard/budget', label: 'Budgeting', icon: <WalletCards size={20} /> },
        { path: '/dashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="sidebar-container glass-panel">
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <Wallet size={24} color="white" />
                </div>
                <span className="logo-text">ExpenseTracker</span>
            </div>

            <div className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <div className="nav-icon">{item.icon}</div>
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="sidebar-footer">
                <button className="nav-item logout-btn" onClick={() => navigate('/goodbye')}>
                    <div className="nav-icon"><LogOut size={20} /></div>
                    <span className="nav-label">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
