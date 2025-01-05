import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        userName: '',
        role: 'user',
    });
    const [userIdAvailable, setUserIdAvailable] = useState(null);
    const [userIdMessage, setUserIdMessage] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '', visible: false });

    const resetFormData = () => {
        setFormData({
            userId: '',
            password: '',
            confirmPassword: '',
            userName: '',
            role: 'user',
        });
        setUserIdAvailable(null);
        setUserIdMessage('');
        setAlert({ type: '', message: '', visible: false });
    };

    useEffect(() => {
        resetFormData();
    }, [isLogin]);

    useEffect(() => {
        if (!isLogin && formData.userId.trim() !== '') {
            const timeoutId = setTimeout(() => {
                checkUserIdAvailability(formData.userId);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [formData.userId, isLogin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const checkUserIdAvailability = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/checkUserId?userId=${userId}`);
            if (response.data.available) {
                setUserIdAvailable(true);
                setUserIdMessage('사용 가능한 아이디입니다.');
            } else {
                setUserIdAvailable(false);
                setUserIdMessage('사용할 수 없는 아이디입니다.');
            }
        } catch (error) {
            console.error('아이디 확인 실패:', error);
            setUserIdAvailable(false);
            setUserIdMessage('아이디 중복 검사 중 문제가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = isLogin ? 'login' : 'register';
            const response = await axios.post(
                `http://localhost:8080/api/${endpoint}`,
                formData,
                { withCredentials: true }
            );

            if (isLogin) {
                setAlert({ type: 'success', message: '로그인 성공!', visible: true });
                window.dispatchEvent(new Event('loginStateChange'));
            } else {
                setAlert({ type: 'success', message: '회원가입 성공!', visible: true });
                setIsLogin(true);
            }

            resetFormData();
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: `실패: ${isLogin ? '로그인' : '회원가입'}에 문제가 발생했습니다.`,
                visible: true,
            });
            console.error(error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isLogin ? '로그인' : '회원가입'}</h2>
                {alert.visible && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {/* 공통 필드 */}
                    <div className="form-group">
                        <label htmlFor="userId">아이디</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            placeholder="아이디를 입력하세요"
                            className='login-page-input-rectangle'
                            required
                        />
                        <p>{userIdMessage && <small className="form-info">{userIdMessage}</small>}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            className='login-page-input-rectangle'
                            required
                        />
                    </div>
    
                    {/* 회원가입 전용 필드 */}
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">비밀번호 확인</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="비밀번호를 다시 입력하세요"
                                    className='login-page-input-rectangle'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">사용자 이름</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    placeholder="사용자 이름을 입력하세요"
                                    className='login-page-input-rectangle'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>역할 선택</label>
                                <div className="form-group-role">
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="user"
                                            checked={formData.role === 'user'}
                                            onChange={handleChange}
                                            className='login-page-role-list'
                                        />
                                        일반
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="teach"
                                            checked={formData.role === 'teach'}
                                            onChange={handleChange}
                                            className='login-page-role-list'
                                        />
                                        강사
                                    </label>
                                </div>
                            </div>
                        </>
                    )}
    
                    {/* 제출 버튼 */}
                    <div className="form-group">
                        <button type="submit" className="form-button">
                            {isLogin ? '로그인' : '회원가입'}
                        </button>
                    </div>
                </form>
                <div className="toggle-container">
                    <p>
                        {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
                        <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                            {isLogin ? '회원가입' : '로그인'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
    
};

export default LoginPage;
