import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Wallet, ArrowRight, Sun, Moon, Lock, CheckCircle2, XCircle, PieChart, CreditCard, Smartphone, Rocket, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', background: 'var(--bg-primary)' }}>

            {/* Navbar */}
            <header className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 5%', borderBottom: '1px solid var(--glass-border)', background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        ₹
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>ExpenseTracker</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <Link to="/login" className="glass-button secondary" style={{ padding: '8px 20px', fontSize: '14px', background: 'transparent', border: 'none', boxShadow: 'none' }}>Log In</Link>
                    <Link to="/signup" className="glass-button" style={{ padding: '8px 20px', fontSize: '14px', borderRadius: '8px' }}>Get Started</Link>
                </div>
            </header>

            {/* Hero Section */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '80px', paddingBottom: '0', paddingLeft: '5%', paddingRight: '5%' }}>

                <div className="animate-fade-in stagger-1" style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', padding: '8px 20px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)' }}></div>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>AI Student Insights</span>
                </div>

                <h1 className="animate-fade-in stagger-2" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: '800', lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-primary)', maxWidth: '900px', letterSpacing: '-0.03em' }}>
                    Stop Running Out of Money <br />
                    <span className="text-gradient">Before Month-End.</span>
                </h1>

                <p className="animate-fade-in stagger-3" style={{ fontSize: 'clamp(18px, 2vw, 20px)', color: 'var(--text-secondary)', maxWidth: '650px', marginBottom: '40px', lineHeight: 1.6 }}>
                    Track expenses in ₹, set smart budgets, and get AI-powered financial insights designed exclusively for Indian students.
                </p>

                <div className="animate-fade-in stagger-4" style={{ display: 'flex', gap: '16px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
                    <Link to="/signup" className="glass-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', padding: '16px 32px', borderRadius: '12px' }}>
                        <Rocket size={20} /> Get Started Free
                    </Link>
                    <Link to="/login" className="glass-button secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', padding: '16px 32px', borderRadius: '12px' }}>
                        <Play size={20} /> See How It Works
                    </Link>
                </div>

                <div className="animate-fade-in stagger-5" style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={18} color="var(--success)" /> No credit card required
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Lock size={18} color="var(--success)" /> Secure & private
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🇮🇳</span> Built for Indian students
                    </div>
                </div>

                {/* Mock Dashboard Preview Window Background */}
                <div className="animate-fade-in stagger-5" style={{
                    marginTop: '64px',
                    maxWidth: '1000px',
                    width: '100%',
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(20px)',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    boxShadow: '0 -30px 60px rgba(0,0,0,0.08)',
                    border: '1px solid var(--glass-border)',
                    borderBottom: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: 'perspective(1000px) rotateX(2deg)',
                    transformOrigin: 'bottom center'
                }}>
                    {/* Browser dots */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.02)' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                    </div>

                    {/* Inner Dashboard Layout */}
                    <div style={{ padding: '32px', display: 'flex', gap: '24px', flexWrap: 'wrap', background: 'var(--bg-secondary)', textAlign: 'left' }}>

                        {/* Floating Safe to Spend Card */}
                        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="glass-card" style={{ background: 'var(--bg-primary)', borderLeft: '4px solid var(--success)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-glass)' }}>
                                <div>
                                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Safe to Spend Daily</h3>
                                    <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>₹450</div>
                                </div>
                                <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                                    <CheckCircle2 size={24} />
                                </div>
                            </div>

                            {/* Mock Chart Area */}
                            <div className="glass-card" style={{ background: 'var(--bg-primary)', height: '180px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '24px', boxShadow: 'var(--shadow-glass)' }}>
                                {[40, 60, 100, 30, 50, 80, 40].map((h, i) => (
                                    <div key={i} style={{
                                        flex: 1,
                                        background: h === 100 ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                                        height: `${h}%`,
                                        borderRadius: '6px 6px 0 0',
                                        opacity: h === 100 ? 1 : 0.6,
                                        transition: 'height 1s ease'
                                    }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Transactions */}
                        <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="glass-card" style={{ background: 'var(--bg-primary)', padding: '24px', boxShadow: 'var(--shadow-glass)', height: '100%' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', color: 'var(--text-primary)' }}>Recent Activity</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {[
                                        { title: 'Zomato', category: 'Food Outing', amount: '-₹350', icon: <Smartphone size={20} />, color: 'var(--accent-primary)' },
                                        { title: 'Netflix', category: 'Subscriptions', amount: '-₹199', icon: <CreditCard size={20} />, color: 'var(--accent-secondary)' },
                                        { title: 'Uber', category: 'Transport', amount: '-₹240', icon: <PieChart size={20} />, color: 'var(--warning)' },
                                    ].map((tx, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{ width: '44px', height: '44px', background: `${tx.color}20`, color: tx.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {tx.icon}
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: '0 0 4px 0', fontWeight: '700', color: 'var(--text-primary)' }}>{tx.title}</h4>
                                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>{tx.category}</span>
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '16px' }}>
                                                {tx.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Problem Section */}
            <section style={{ padding: '100px 5%', background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="animate-fade-in" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '64px', letterSpacing: '-0.02em' }}>
                        Why Students Struggle With Money
                    </h2>
                    <div className="responsive-grid" style={{ gap: '32px' }}>
                        {[
                            { icon: <XCircle size={24} />, color: 'var(--danger)', title: 'No Tracking System', text: 'Relying on mental math or scattered notes leads to forgotten expenses and a false sense of security.' },
                            { icon: <CreditCard size={24} />, color: 'var(--warning)', title: 'Overspending', text: 'Frequent ordering out, unexpected subscriptions, and impulse buys drain the budget early in the month.' },
                            { icon: <PieChart size={24} />, color: 'var(--accent-primary)', title: 'No Awareness', text: 'Lacking a clear visualization of where the money actually goes makes it impossible to adjust habits.' },
                            { icon: <TrendingUp size={24} />, color: 'var(--success)', title: 'No Savings Discipline', text: 'Without a structured goal and daily safe-to-spend limits, saving becomes an afterthought.' }
                        ].map((card, i) => (
                            <div key={i} className="glass-card animate-fade-in stagger-2" style={{ textAlign: 'left', background: 'var(--bg-primary)', padding: '32px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-glass)' }}>
                                <div style={{ background: `${card.color}15`, color: card.color, width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                    {card.icon}
                                </div>
                                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{card.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '15px' }}>{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;
