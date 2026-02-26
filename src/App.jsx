import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';
import Goodbye from './pages/Goodbye';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import './App.css';

// Custom wrapper to prevent authenticated users from seeing Landing Page
const PublicRoute = ({ children }) => {
    const { currentUser } = useAuth();
    if (currentUser) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <AuthProvider>
                    <div className="app-container">
                        <DataProvider>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={
                                    <PublicRoute>
                                        <Landing />
                                    </PublicRoute>
                                } />
                                <Route path="/login" element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                } />
                                <Route path="/signup" element={
                                    <PublicRoute>
                                        <Signup />
                                    </PublicRoute>
                                } />

                                {/* Welcome Route (Protected, standalone) */}
                                <Route path="/welcome" element={
                                    <ProtectedRoute>
                                        <Welcome />
                                    </ProtectedRoute>
                                } />

                                {/* Goodbye Route (Protected, standalone) */}
                                <Route path="/goodbye" element={
                                    <ProtectedRoute>
                                        <Goodbye />
                                    </ProtectedRoute>
                                } />

                                {/* Protected Routes */}
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <MainLayout />
                                    </ProtectedRoute>
                                }>
                                    <Route index element={<Dashboard />} />
                                    <Route path="analytics" element={<Analytics />} />
                                    <Route path="transactions" element={<Transactions />} />
                                    <Route path="budget" element={<Budget />} />
                                    <Route path="settings" element={<Settings />} />
                                </Route>

                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </DataProvider>
                    </div>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
