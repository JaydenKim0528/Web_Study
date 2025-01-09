import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Header.css';

const Header = () => {
    const { isLoggedIn, userId, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="header-logo">
                    <Link to="/" className="header-main-link">Web Study</Link>
                </div>
                <nav className="header-nav">
                    <Link to="/courses" className="header-link">강의</Link>
                    <Link to="/community" className="header-link">커뮤니티</Link>
                </nav>
            </div>
            <div className="header-right">
                {isLoggedIn ? (
                    <div className="header-user">
                        <button
                            className="header-user-button"
                            onClick={toggleDropdown}
                        >
                            {userId} ▼
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button
                                    onClick={() => navigate('/mypage')}
                                    className="dropdown-item"
                                >
                                    마이페이지
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="dropdown-item"
                                >
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="header-login-button"
                    >
                        로그인
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
