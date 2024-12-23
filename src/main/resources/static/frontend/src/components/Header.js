import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    // 페이지 이동
    const navigate = useNavigate();

    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 된 사용자ID 상태 관리
    const [userId, setUserId] = useState('');

    // 로그인 상태 업데이트
    const updateLoginState = () => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setIsLoggedIn(true);
            setUserId(storedUserId);
        } else {
            setIsLoggedIn(false);
            setUserId('');
        }
    };

    // 컴포넌트 렌더링시 동작
    useEffect(() => {
        updateLoginState();

        const handleLoginStateChange = () => updateLoginState();
        window.addEventListener('loginStateChange', handleLoginStateChange);

        return () => {
            window.removeEventListener('loginStateChange', handleLoginStateChange);
        };
    }, []);

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserId('');
        window.dispatchEvent(new Event('loginStateChange'));
        navigate('/');
    };

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
                {isLoggedIn ? (
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {userId}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => navigate('/mypage')}
                                >
                                    마이페이지
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button
                        className="header-login-button"
                        onClick={() => navigate('/login')}
                    >
                        로그인
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
