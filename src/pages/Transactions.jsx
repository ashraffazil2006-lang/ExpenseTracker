import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Card } from '../components/Card';
import { Search, Download, Trash2, Filter } from 'lucide-react';

const Transactions = () => {
    const { expenses, budget, deleteExpense } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const filteredExpenses = useMemo(() => {
        return expenses.filter(e => {
            const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
            const matchesDateFrom = !dateFrom || new Date(e.date) >= new Date(dateFrom);
            const matchesDateTo = !dateTo || new Date(e.date) <= new Date(dateTo);
            return matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo;
        });
    }, [expenses, searchTerm, filterCategory, dateFrom, dateTo]);

    const handleExport = () => {
        const headers = ['Date', 'Title', 'Category', 'Amount (₹)'];
        const csvContent = [
            headers.join(','),
            ...filteredExpenses.map(e => `${e.date},"${e.title}",${e.category},${e.amount}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Expenses_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>All Transactions</h2>
                    <button onClick={handleExport} className="glass-button secondary" style={{ padding: '8px 16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--success)', color: 'white', border: 'none' }}>
                        <Download size={16} /> Export CSV
                    </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                    <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-primary)', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <Search size={18} color="var(--text-muted)" />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
                        />
                    </div>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', outline: 'none', cursor: 'pointer' }}
                    >
                        <option value="All">All Categories</option>
                        {Object.keys(budget.categories).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>From:</span>
                        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="glass-input" style={{ padding: '8px 12px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>To:</span>
                        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="glass-input" style={{ padding: '8px 12px' }} />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                                <th style={{ padding: '12px 16px', fontWeight: '500' }}>Date</th>
                                <th style={{ padding: '12px 16px', fontWeight: '500' }}>Title</th>
                                <th style={{ padding: '12px 16px', fontWeight: '500' }}>Category</th>
                                <th style={{ padding: '12px 16px', fontWeight: '500' }}>Amount</th>
                                <th style={{ padding: '12px 16px', fontWeight: '500', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                filteredExpenses.map(e => (
                                    <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '16px' }}>{e.date}</td>
                                        <td style={{ padding: '16px', fontWeight: 'bold' }}>{e.title}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '12px' }}>
                                                {e.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>₹{e.amount.toFixed(2)}</td>
                                        <td style={{ padding: '16px', textAlign: 'center' }}>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this expense?')) {
                                                        deleteExpense(e.id);
                                                    }
                                                }}
                                                style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'var(--danger)' }}
                                                title="Delete Expense"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Transactions;
