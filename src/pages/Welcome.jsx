import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Welcome.css';

const Welcome = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [welcomeType, setWelcomeType] = useState('');

    useEffect(() => {
        const type = sessionStorage.getItem('welcomeType') || 'login';
        setWelcomeType(type);

        // Clear the flags so if they refresh, they go to dashboard
        sessionStorage.removeItem('showWelcome');
        sessionStorage.removeItem('welcomeType');

        // After animation completes (e.g., 3-4 seconds), navigate to dashboard
        const timer = setTimeout(() => {
            navigate('/dashboard', { replace: true });
        }, 4000); // 4 seconds total screen time

        return () => clearTimeout(timer);
    }, [navigate]);

    const name = currentUser?.name || 'USER';
    // Split the name into letters for the animation
    const letters = name.toUpperCase().split('');

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h2 className="welcome-text fade-in-up">
                    {welcomeType === 'signup' ? 'WELCOME' : 'WELCOME BACK'}
                </h2>

                <div className="name-container">
                    {letters.map((letter, index) => (
                        <span
                            key={index}
                            className="glowing-letter"
                            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
