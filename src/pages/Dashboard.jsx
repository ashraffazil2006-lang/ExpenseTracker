import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { SummaryCard, Card } from '../components/Card';
import { TrendingUp, TrendingDown, PiggyBank, IndianRupee } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { db } from '../config/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { expenses, budget } = useData();

    // Basic Calculations Calculate Total Spend for this month (Hardcoded to Feb 2026 based on mock data)
    const totalSpend = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalBudget = budget.limit;

    // Calculations
    const savings = totalBudget - totalSpend;
    const today = new Date();
    const daysLeft = 30; // user requested a strict 30 divisor instead of remainder of month
    const safeToSpend = Math.max(0, savings / daysLeft).toFixed(0);

    // Aggregating for PieChart
    const getCategoryData = () => {
        const categories = {};
        expenses.forEach(e => {
            categories[e.category] = (categories[e.category] || 0) + e.amount;
        });
        return Object.keys(categories).map(key => ({ name: key, value: categories[key] }));
    };

    const pieData = getCategoryData();
    const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div style={{ padding: '0px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Summary Cards */}
            <div className="responsive-grid">
                <div className="animate-fade-in stagger-1">
                    <SummaryCard
                        title="Total Spending"
                        amount={totalSpend}
                        icon={<IndianRupee size={24} />}
                        type="warning"
                        trend={-2.4}
                    />
                </div>
                <div className="animate-fade-in stagger-2">
                    <SummaryCard
                        title="Monthly Budget"
                        amount={totalBudget}
                        icon={<TrendingUp size={24} />}
                        type="default"
                    />
                </div>
                <div className="animate-fade-in stagger-3">
                    <SummaryCard
                        title="Savings"
                        amount={savings}
                        icon={<PiggyBank size={24} />}
                        type="success"
                        trend={15}
                    />
                </div>
                <div className="animate-fade-in stagger-4">
                    <SummaryCard
                        title="Safe to Spend/Day"
                        amount={safeToSpend}
                        icon={<TrendingDown size={24} />}
                        type={savings > 0 ? 'success' : 'danger'}
                    />
                </div>
            </div>

            <div className="responsive-grid-large">
                {/* Spending Category Pie Chart */}
                <div className="animate-fade-in stagger-2">
                    <Card>
                        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Spending by Category</h3>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Budget vs Actual Bar Chart */}
                <div className="animate-fade-in stagger-3">
                    <Card>
                        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Budget vs Actual</h3>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { name: 'Rent', Budget: budget.categories.Rent, Actual: pieData.find(d => d.name === 'Rent')?.value || 0 },
                                        { name: 'Food', Budget: budget.categories.Food, Actual: pieData.find(d => d.name === 'Food')?.value || 0 },
                                        { name: 'Shopping', Budget: budget.categories.Shopping, Actual: pieData.find(d => d.name === 'Shopping')?.value || 0 },
                                        { name: 'Transport', Budget: budget.categories.Transport, Actual: pieData.find(d => d.name === 'Transport')?.value || 0 },
                                    ]}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                                    <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                                    />
                                    <Bar dataKey="Budget" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Actual" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Recent Transactions List */}
            <div className="animate-fade-in stagger-4">
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Recent Transactions</h3>
                        <button className="glass-button" style={{ padding: '8px 16px', fontSize: '12px' }}>View All</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {expenses.slice(0, 5).map(e => (
                            <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                                        <IndianRupee size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontWeight: '600' }}>{e.title}</h4>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{e.category} • {e.date}</span>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                    -₹{e.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
