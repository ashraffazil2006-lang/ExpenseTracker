import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Card } from '../components/Card';
import { analyzeFinances } from '../services/aiEngine';
import { BrainCircuit, AlertTriangle, CheckCircle, Info, TrendingDown, Target, Zap } from 'lucide-react';

const Analytics = () => {
    const { expenses, budget } = useData();

    const insights = useMemo(() => analyzeFinances(expenses, budget), [expenses, budget]);

    const safeToSpend = useMemo(() => {
        const totalSpend = expenses.reduce((sum, e) => sum + e.amount, 0);
        const savings = budget.limit - totalSpend;
        const daysLeft = 30; // user requested strict 30 divisor
        return Math.max(0, savings / daysLeft).toFixed(0);
    }, [expenses, budget]);

    const getSafeColor = () => {
        const totalSpend = expenses.reduce((sum, e) => sum + e.amount, 0);
        const ratio = totalSpend / budget.limit;
        if (ratio < 0.5) return 'var(--success)';
        if (ratio < 0.8) return 'var(--warning)';
        return 'var(--danger)';
    };

    const totalSpend = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
    const projectedSpend = useMemo(() => {
        const daysPassed = new Date().getDate();
        if (daysPassed === 0) return 0;
        return ((totalSpend / daysPassed) * 30).toFixed(0);
    }, [totalSpend]);

    const subscriptionsAmount = useMemo(() =>
        expenses.filter(e => e.category === 'Subscriptions').reduce((sum, e) => sum + e.amount, 0)
        , [expenses]);

    const topCategory = useMemo(() => {
        const counts = {};
        expenses.forEach(e => counts[e.category] = (counts[e.category] || 0) + e.amount);
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
    }, [expenses]);

    const getInsightIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle color="var(--success)" />;
            case 'danger': return <AlertTriangle color="var(--danger)" />;
            default: return <Info color="var(--warning)" />;
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>

            {/* Safe to Spend Banner */}
            <div className="animate-fade-in stagger-1">
                <Card style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'var(--bg-glass)',
                    borderLeft: `4px solid ${getSafeColor()}`
                }}>
                    <div>
                        <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <BrainCircuit color="var(--accent-secondary)" /> Safe to Spend Daily
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Maximum amount you can spend per day to stay within budget.</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '120px',
                        height: '100px',
                        borderRadius: '16px',
                        border: `2px solid ${getSafeColor()}`,
                        boxShadow: `0 0 20px ${getSafeColor()}40`
                    }}>
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: getSafeColor() }}>₹{safeToSpend}</span>
                    </div>
                </Card>
            </div>

            {/* AI Advanced Metrics Row */}
            <div className="responsive-grid animate-fade-in stagger-2" style={{ marginTop: '8px' }}>
                <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-primary)', borderTop: '3px solid var(--warning)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Projected Month-End</h4>
                        <TrendingDown size={18} color="var(--warning)" />
                    </div>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: projectedSpend > budget.limit ? 'var(--danger)' : 'var(--text-primary)' }}>
                        ₹{projectedSpend}
                    </span>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Based on your current daily average.</p>
                </Card>

                <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-primary)', borderTop: '3px solid var(--accent-primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Highest Spend Area</h4>
                        <Target size={18} color="var(--accent-primary)" />
                    </div>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
                        {topCategory[0]}
                    </span>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Accounts for ₹{topCategory[1]} of spending.</p>
                </Card>

                <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-primary)', borderTop: '3px solid var(--success)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Subscription Audit</h4>
                        <Zap size={18} color="var(--success)" />
                    </div>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
                        ₹{subscriptionsAmount}
                    </span>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total fixed recurring costs detected.</p>
                </Card>
            </div>

            {/* AI Insights List */}
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '16px' }}>Personalized Insights</h3>
            <div className="responsive-grid animate-fade-in stagger-2">
                {insights.length === 0 ? (
                    <Card><p>Gathering more data to provide insights...</p></Card>
                ) : (
                    insights.map((insight, idx) => (
                        <Card key={idx} style={{
                            borderTop: `3px solid ${insight.type === 'success' ? 'var(--success)' : insight.type === 'danger' ? 'var(--danger)' : 'var(--warning)'}`
                        }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <div style={{ marginTop: '2px' }}>{getInsightIcon(insight.type)}</div>
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{insight.title}</h4>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{insight.message}</p>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

        </div>
    );
};

export default Analytics;
