import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    console.log('All Cookies:', value)

    const parts = value.split(`; ${name}=`);
    console.log('Parts for', name, ':', parts)

    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};


const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);  
    const [userId, setUserId] = useState('');

    const updateLoginState = () => {
        const token = getCookie('token');
        console.log('Token:', token)

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);

                // const subject = JSON.parse(decodedToken.sub);
                // console.log('Parsed Subject:', subject);

                setIsLoggedIn(true);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error('토큰 해독 실패:', error);
                setIsLoggedIn(false);
                setUserId('');
            }
        } else {
            setIsLoggedIn(false);
            setUserId('');
        }
    };

    useEffect(() => {
        updateLoginState();
        const handleLoginStateChange = () => updateLoginState();
        window.addEventListener('loginStateChange', handleLoginStateChange);
        return () => {
            window.removeEventListener('loginStateChange', handleLoginStateChange);
        };
    }, []);

    const handleLogout = () => {
        document.cookie = 'token=; Path=/; Max-Age=0;';
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
