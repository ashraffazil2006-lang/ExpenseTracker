import React from 'react';

const ProgressBar = ({ label, current, max }) => {
    const percentage = Math.min((current / max) * 100, 100) || 0;
    const isWarning = percentage >= 80 && percentage < 100;
    const isDanger = percentage >= 100;

    let color = 'var(--accent-primary)';
    if (isDanger) color = 'var(--danger)';
    else if (isWarning) color = 'var(--warning)';

    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500', fontSize: '14px', color: 'var(--text-primary)' }}>{label}</span>
                ₹{current.toFixed(0)} / ₹{max.toFixed(0)}
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                    style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: color,
                        transition: 'width 0.5s ease-in-out, background 0.5s ease',
                        borderRadius: 'var(--radius-full)'
                    }}
                />
            </div>
            {isWarning && <div style={{ color: 'var(--warning)', fontSize: '12px', marginTop: '6px' }}>⚠️ 80% usage warning - Slow down!</div>}
            {isDanger && <div style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '6px' }}>🚨 Budget Exceeded!</div>}
        </div>
    );
};

export default ProgressBar;
