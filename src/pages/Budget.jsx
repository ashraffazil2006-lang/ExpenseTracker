import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Card } from '../components/Card';
import ProgressBar from '../components/ProgressBar';

const Budget = () => {
    const { budget, expenses, addExpense, updateBudget } = useData();

    // New Expense state
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');

    // Budget Editing State
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [editLimit, setEditLimit] = useState(budget?.limit || 2000);
    const [editCategories, setEditCategories] = useState(budget?.categories || {});

    // Sync local edit state when backend budget loads
    useEffect(() => {
        if (budget) {
            setEditLimit(budget.limit);
            setEditCategories(budget.categories);
        }
    }, [budget]);

    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!title || !amount) return;

        addExpense({
            title,
            amount: parseFloat(amount),
            category,
            date: new Date().toISOString().split('T')[0],
            type: 'expense'
        });

        setTitle('');
        setAmount('');
    };

    const handleCategoryChange = (cat, value) => {
        setEditCategories(prev => ({
            ...prev,
            [cat]: parseFloat(value) || 0
        }));
    };

    const handleSaveBudget = async () => {
        await updateBudget(parseFloat(editLimit), editCategories);
        setIsEditingBudget(false);
    };

    const calculateCategorySpend = (cat) => {
        return expenses.filter(e => e.category === cat).reduce((sum, item) => sum + item.amount, 0);
    };

    const totalSpend = expenses.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="responsive-grid-asym">

            {/* Log Expense Form */}
            <Card>
                <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 'bold' }}>Log New Expense</h3>
                <form onSubmit={handleAddExpense}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Title</label>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="e.g. Sushi dinner"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Amount (₹)</label>
                        <input
                            type="number"
                            className="glass-input"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Category</label>
                        <select
                            className="glass-input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {Object.keys(budget.categories || {}).map(cat => (
                                <option key={cat} value={cat} style={{ background: 'var(--bg-secondary)' }}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="glass-button" style={{ width: '100%' }}>Add Expense</button>
                </form>
            </Card>

            {/* Budget Utilization Panel */}
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Budget Utilization</h3>
                    <button
                        className={`glass-button ${!isEditingBudget ? 'secondary' : ''}`}
                        style={{ padding: '6px 12px', fontSize: '12px', boxShadow: 'none' }}
                        onClick={() => setIsEditingBudget(!isEditingBudget)}
                    >
                        {isEditingBudget ? 'Cancel Edit' : 'Edit Budgets'}
                    </button>
                </div>

                {isEditingBudget ? (
                    <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--glass-border)' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Customize Limits</h4>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: 'var(--text-secondary)' }}>Total Monthly Target (₹)</label>
                            <input
                                type="number"
                                className="glass-input"
                                value={editLimit}
                                onChange={(e) => setEditLimit(e.target.value)}
                            />
                        </div>

                        <h5 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-secondary)' }}>Category Sub-limits</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                            {Object.keys(editCategories).map(cat => (
                                <div key={cat}>
                                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: 'var(--text-secondary)' }}>{cat}</label>
                                    <input
                                        type="number"
                                        className="glass-input"
                                        style={{ padding: '8px', fontSize: '14px' }}
                                        value={editCategories[cat]}
                                        onChange={(e) => handleCategoryChange(cat, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="glass-button" style={{ width: '100%', marginTop: '24px' }} onClick={handleSaveBudget}>
                            Save Budget Configuration
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: '32px' }}>
                            <ProgressBar label="Overall Budget" current={totalSpend} max={budget?.limit || 2000} />
                        </div>

                        <h4 style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>By Category</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {Object.keys(budget.categories || {}).map(cat => (
                                <ProgressBar
                                    key={cat}
                                    label={cat}
                                    current={calculateCategorySpend(cat)}
                                    max={budget.categories[cat]}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Card>

        </div>
    );
};

export default Budget;
