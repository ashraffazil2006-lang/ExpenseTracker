import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Goodbye.css';

const Goodbye = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(async () => {
            await logout();
            navigate('/', { replace: true });
        }, 3000); // 3 seconds total screen time

        return () => clearTimeout(timer);
    }, [logout, navigate]);

    const name = currentUser?.name || 'USER';
    const letters = name.toUpperCase().split('');

    return (
        <div className="goodbye-container">
            <div className="goodbye-content">
                <h2 className="goodbye-text fade-in-up">
                    SEE YOU SOON
                </h2>

                <div className="goodbye-name-container">
                    {letters.map((letter, index) => (
                        <span
                            key={index}
                            className="goodbye-glowing-letter"
                            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Goodbye;
