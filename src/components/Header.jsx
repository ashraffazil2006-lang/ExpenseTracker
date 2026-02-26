import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, Plus, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header = ({ title, onAddExpense }) => {
    const { currentUser } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="header-container glass-panel">
            <div className="header-title">
                <h1 className="animate-fade-in">{title}</h1>
            </div>

            <div className="header-actions">
                <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button onClick={onAddExpense} className="glass-button" style={{ padding: '8px 16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--accent-primary)', color: 'white', border: 'none' }}>
                    <Plus size={16} /> Add Expense
                </button>

                <div className="search-bar">
                    <Search size={18} color="var(--text-muted)" />
                    <input type="text" placeholder="Search transactions..." />
                </div>

                <div ref={notifRef} style={{ position: 'relative' }}>
                    <button className="icon-btn" title="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
                        <Bell size={20} />
                        <span className="badge">3</span>
                    </button>

                    {showNotifications && (
                        <div className="glass-panel animate-fade-in" style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '320px',
                            background: 'var(--bg-glass)',
                            padding: '16px',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-glass)',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
                                Notifications
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '3px solid #3b82f6' }}>
                                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}><strong>Budget Alert:</strong> You are close to your Dining limit.</p>
                                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Just now</span>
                                </div>
                                <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10b981' }}>
                                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}><strong>Goal Reached:</strong> Saved ₹500 this week!</p>
                                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>2 hours ago</span>
                                </div>
                                <div style={{ padding: '8px', borderRadius: '8px', background: 'var(--bg-primary)', borderLeft: '3px solid var(--glass-border)' }}>
                                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}><strong>System:</strong> Welcome to AI Insights v2.0</p>
                                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>1 day ago</span>
                                </div>
                            </div>
                            <button onClick={() => { setShowNotifications(false); navigate('/dashboard/settings'); }} style={{ width: '100%', padding: '8px', marginTop: '4px', background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>
                                Manage Settings
                            </button>
                        </div>
                    )}
                </div>

                <div className="user-profile">
                    <div className="avatar">
                        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{currentUser?.name || 'User'}</span>
                        <span className="user-role">Premium</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
