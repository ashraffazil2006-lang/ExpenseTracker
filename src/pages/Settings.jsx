import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { Card } from '../components/Card';
import { User, Shield, Bell } from 'lucide-react';

const Settings = () => {
    const { currentUser } = useAuth();

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [newName, setNewName] = useState(currentUser?.name || '');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = async () => {
        if (!newName.trim() || newName === currentUser.name) {
            setIsEditingProfile(false);
            return;
        }

        setIsUpdating(true);
        try {
            await updateProfile(auth.currentUser, { displayName: newName });
            // Alert user to refresh or rely on auth state (AuthContext doesn't auto-listen to profile changes, so reload might be needed to see it instantly without refactoring AuthContext further)
            alert("Profile updated successfully! Refresh to see changes globally.");
            setIsEditingProfile(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!currentUser?.email) return;
        try {
            await sendPasswordResetEmail(auth, currentUser.email);
            alert(`Password reset email sent to ${currentUser.email}. Please check your inbox.`);
        } catch (error) {
            console.error("Error sending reset email:", error);
            alert("Failed to send password reset email.");
        }
    };

    return (
        <div className="responsive-grid">
            <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold', boxShadow: 'var(--glow-primary)', flexShrink: 0 }}>
                        {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {isEditingProfile ? (
                        <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                type="text"
                                className="glass-input"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                style={{ padding: '8px', flex: 1 }}
                            />
                            <button className="glass-button" onClick={handleUpdateProfile} disabled={isUpdating} style={{ padding: '8px 16px' }}>
                                Save
                            </button>
                            <button className="glass-button secondary" onClick={() => setIsEditingProfile(false)} style={{ padding: '8px 16px' }}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{currentUser?.name || 'User'}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{currentUser?.email || 'email@example.com'}</p>
                        </div>
                    )}
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Account Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <User size={20} color="var(--accent-primary)" />
                            <span>Edit Display Name</span>
                        </div>
                        <button
                            className="glass-button secondary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => { setIsEditingProfile(true); setNewName(currentUser?.name || ''); }}
                            disabled={isEditingProfile}
                        >
                            Update
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Shield size={20} color="var(--success)" />
                            <span>Change Password</span>
                        </div>
                        <button
                            className="glass-button secondary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={handlePasswordReset}
                        >
                            Manage
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Bell size={20} color="var(--warning)" />
                            <span>Notifications</span>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
                            <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} defaultChecked={true} onClick={(e) => {
                                const isChecked = e.target.checked;
                                e.target.nextElementSibling.style.background = isChecked ? 'var(--accent-primary)' : 'var(--glass-border)';
                                e.target.nextElementSibling.firstChild.style.transform = isChecked ? 'translateX(20px)' : 'translateX(0)';
                            }} />
                            <div style={{ width: '44px', height: '24px', background: 'var(--accent-primary)', borderRadius: '24px', position: 'relative', transition: 'background 0.3s' }}>
                                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', transition: 'transform 0.3s', transform: 'translateX(20px)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                            </div>
                        </label>
                    </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', marginTop: '32px' }}>AI Insights & Recommendations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>🧠</span>
                            <div>
                                <span style={{ display: 'block' }}>Daily Spending Insights</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Get AI-powered tips and warnings about your daily spend.</span>
                            </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
                            <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} defaultChecked={true} onClick={(e) => {
                                const isChecked = e.target.checked;
                                e.target.nextElementSibling.style.background = isChecked ? 'var(--accent-primary)' : 'var(--glass-border)';
                                e.target.nextElementSibling.firstChild.style.transform = isChecked ? 'translateX(20px)' : 'translateX(0)';
                            }} />
                            <div style={{ width: '44px', height: '24px', background: 'var(--accent-primary)', borderRadius: '24px', position: 'relative', transition: 'background 0.3s' }}>
                                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', transition: 'transform 0.3s', transform: 'translateX(20px)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                            </div>
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '20px' }}>💰</span>
                            <div>
                                <span style={{ display: 'block' }}>Savings Opportunities</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Allow AI to find recurring subscriptions you can cancel.</span>
                            </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
                            <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} onClick={(e) => {
                                const isChecked = e.target.checked;
                                e.target.nextElementSibling.style.background = isChecked ? 'var(--accent-primary)' : 'var(--glass-border)';
                                e.target.nextElementSibling.firstChild.style.transform = isChecked ? 'translateX(20px)' : 'translateX(0)';
                            }} />
                            <div style={{ width: '44px', height: '24px', background: 'var(--glass-border)', borderRadius: '24px', position: 'relative', transition: 'background 0.3s' }}>
                                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', transition: 'transform 0.3s', transform: 'translateX(0)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                            </div>
                        </label>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Settings;
