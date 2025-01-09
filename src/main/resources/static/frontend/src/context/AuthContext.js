import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');

    // 로그인 상태 확인 및 복구
    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/validate', { withCredentials: true });
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                    setUserId(response.data.userId);
                }
            } catch (error) {
                console.error('로그인 상태 확인 실패:', error);
                setIsLoggedIn(false);
                setUserId('');
            }
        };

        validateSession();
    }, []);

    const login = (id) => {
        setIsLoggedIn(true);
        setUserId(id);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserId('');
        document.cookie = 'token=; Path=/; Max-Age=0;';
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
