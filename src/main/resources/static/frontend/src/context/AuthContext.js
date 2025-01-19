import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/validate', { withCredentials: true });
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                    setUserId(response.data.userId);
                    console.log("USER ID : ", response.data.userId);
                    setUserName(response.data.userName);
                    console.log("USER NAME : ", response.data.userName);
                    setRole(response.data.role);
                    console.log("USER ROLE : ", response.data.role);
                } else {
                    resetAuthState();
                }
            } catch (error) {
                console.error('로그인 상태 확인 실패:', error);
                resetAuthState();
            } finally {
                setLoading(false);
            }
        };

        validateSession();
    }, []);

    const resetAuthState = () => {
        setIsLoggedIn(false);
        setUserId('');
        setRole('');
    };

    const login = (id, userRole) => {
        setIsLoggedIn(true);
        setUserId(id);
        setRole(userRole);
    };

    const logout = () => {
        resetAuthState();
        document.cookie = 'token=; Path=/; Max-Age=0;';
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, userName, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
