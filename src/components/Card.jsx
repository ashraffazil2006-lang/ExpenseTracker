import React from 'react';

export const Card = ({ children, className = '', style = {} }) => {
    return (
        <div className={`glass-card ${className}`} style={{ padding: '24px', ...style }}>
            {children}
        </div>
    );
};

export const SummaryCard = ({ title, amount, icon, type = 'default', trend }) => {
    // type can be 'default', 'success', 'warning', 'danger'
    const getColor = () => {
        switch (type) {
            case 'success': return 'var(--success)';
            case 'warning': return 'var(--warning)';
            case 'danger': return 'var(--danger)';
            default: return 'var(--accent-primary)';
        }
    };

    return (
        <div className="glass-card summary-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: `rgba(${type === 'success' ? '16, 185, 129' : type === 'warning' ? '245, 158, 11' : type === 'danger' ? '239, 68, 68' : '99, 102, 241'}, 0.15)`, color: getColor() }}>
                    {icon}
                </div>
                {trend && (
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: trend > 0 ? 'var(--success)' : 'var(--danger)' }}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </div>
                )}
            </div>
            <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>{title}</p>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>₹{amount.toLocaleString()}</h2>
            </div>
        </div>
    );
};
