import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Header.css';

const Header = () => {
    const { isLoggedIn, userId, role, logout } = useAuth(); // role 추가
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // 외부 클릭 감지 핸들러
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                    <div className="header-user" ref={dropdownRef}>
                        <button
                            className={`header-user-button ${isDropdownOpen ? 'active' : ''}`}
                            onClick={toggleDropdown}
                        >
                            {userId} ({role === 'TEACH' ? '강사' : '사용자'}) {/* 역할 표시 */}
                        </button>
                        <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
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
