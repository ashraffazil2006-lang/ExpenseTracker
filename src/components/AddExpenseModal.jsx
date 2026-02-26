import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X } from 'lucide-react';

const AddExpenseModal = ({ onClose }) => {
    const { addExpense, budget } = useData();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(Object.keys(budget.categories)[0] || 'Food');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !amount || !category || !date) return;
        setLoading(true);
        await addExpense({
            title,
            amount: parseFloat(amount),
            category,
            date
        });
        setLoading(false);
        onClose();
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '24px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <X size={24} />
                </button>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Add New Expense</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Title</label>
                        <input type="text" className="glass-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Groceries" required />
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Amount (₹)</label>
                        <input type="number" className="glass-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="0" step="0.01" required />
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Category</label>
                        <select className="glass-input" value={category} onChange={(e) => setCategory(e.target.value)} style={{ appearance: 'none', cursor: 'pointer' }} required>
                            {Object.keys(budget.categories).map(cat => (
                                <option key={cat} value={cat} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Date</label>
                        <input type="date" className="glass-input" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <button type="submit" className="glass-button" disabled={loading} style={{ marginTop: '16px', padding: '12px', justifyContent: 'center' }}>
                        {loading ? 'Adding...' : 'Add Expense'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;
