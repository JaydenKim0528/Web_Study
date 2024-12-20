import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-left-link">
                <div className="header-logo">
                    <Link to="/" className="header-main-link">Web Study</Link>
                </div>
                <nav className="header-navbar">
                    <Link to="/courses" className="header-link">강의</Link>
                    <Link to="/roadmap" className="header-link">로드맵</Link>
                    <Link to="/mentoring" className="header-link">멘토링</Link>
                    <Link to="/community" className="header-link">커뮤니티</Link>
                </nav>
            </div>
            <div className="header-search-bar">
                <input
                    type="text"
                    className="header-search-study"
                    placeholder="원하는 강의를 검색해보세요"
                />
                <button
                    className="header-login-button"
                    onClick={() => navigate('/login')}
                >
                    로그인
                </button>
            </div>
        </header>
    );
};

export default Header;
