import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        userName: '',
        role: 'USER',
    });
    const [messages, setMessages] = useState({
        userId: { text: '', type: '' },
        password: { text: '', type: '' },
        confirmPassword: { text: '', type: '' },
    });
    const [alert, setAlert] = useState({ type: '', message: '', visible: false });

    // 유효성 검사 정규식
    const userIdRegex = /^[a-z0-9]{6,20}$/; // 영문 소문자 + 숫자 6~20자리
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/; // 영문 + 숫자 + 특수문자 포함 8~20자리

    // 입력 초기화
    const resetFormData = () => {
        setFormData({
            userId: '',
            password: '',
            confirmPassword: '',
            userName: '',
            role: 'USER',
        });
        setMessages({
            userId: { text: '', type: '' },
            password: { text: '', type: '' },
            confirmPassword: { text: '', type: '' },
        });
        setAlert({ type: '', message: '', visible: false });
    };

    useEffect(() => resetFormData(), [isLogin]);

    // 아이디 중복 검사
    const checkUserIdAvailability = async (userId) => {
        try {
            const response = await axios.get('http://localhost:8080/api/checkUserId', {
                params: { userId },
            });
            setMessages((prev) => ({
                ...prev,
                userId: response.data.available
                    ? { text: '사용 가능한 아이디입니다.', type: 'success' }
                    : { text: '이미 사용 중인 아이디입니다.', type: 'error' },
            }));
        } catch (error) {
            setMessages((prev) => ({
                ...prev,
                userId: { text: '아이디 중복 검사 중 오류가 발생했습니다.', type: 'error' },
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (!isLogin) {
            if (name === 'userId') {
                if (!userIdRegex.test(value)) {
                    setMessages((prev) => ({
                        ...prev,
                        userId: { text: '아이디는 영문 소문자와 숫자로 6~20자리여야 합니다.', type: 'error' },
                    }));
                } else {
                    checkUserIdAvailability(value);
                }
            }

            if (name === 'password') {
                setMessages((prev) => ({
                    ...prev,
                    password: passwordRegex.test(value)
                        ? { text: '사용 가능한 비밀번호입니다.', type: 'success' }
                        : { text: '비밀번호는 영문, 숫자, 특수문자를 포함해 8~20자여야 합니다.', type: 'error' },
                }));
            }

            if (name === 'confirmPassword') {
                setMessages((prev) => ({
                    ...prev,
                    confirmPassword: value === formData.password
                        ? { text: '비밀번호가 일치합니다.', type: 'success' }
                        : { text: '비밀번호가 일치하지 않습니다.', type: 'error' },
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? 'login' : 'register';
        const requestData = isLogin
            ? { userId: formData.userId, password: formData.password }
            : formData;

        try {
            const response = await axios.post(`http://localhost:8080/api/${endpoint}`, requestData, {
                withCredentials: true,
            });
            if (isLogin) {
                const { userId, role } = response.data;
                login(userId, role);
                navigate('/');
            } else {
                setAlert({ type: 'success', message: '회원가입 성공! 로그인하세요.', visible: true });
                setIsLogin(true); // 회원가입 성공 후 로그인 폼으로 전환
            }
        } catch (error) {
            setAlert({ type: 'danger', message: `${isLogin ? '로그인' : '회원가입'}에 실패했습니다.`, visible: true });
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
                    <div className="form-group">
                        <label htmlFor="userId">아이디</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            placeholder="아이디를 입력하세요"
                            required
                        />
                        {!isLogin && messages.userId.text && (
                            <p className={`status-message ${messages.userId.type}`}>{messages.userId.text}</p>
                        )}
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
                            required
                        />
                        {!isLogin && messages.password.text && (
                            <p className={`status-message ${messages.password.type}`}>{messages.password.text}</p>
                        )}
                    </div>
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
                                    required
                                />
                                {messages.confirmPassword.text && (
                                    <p className={`status-message ${messages.confirmPassword.type}`}>
                                        {messages.confirmPassword.text}
                                    </p>
                                )}
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
                                    required
                                />
                            </div>
                            <div className="form-group-role">
                                <label>회원 유형</label>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="USER"
                                            checked={formData.role === 'USER'}
                                            onChange={handleChange}
                                        />
                                        일반
                                    </label>
                                    <label style={{ marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="TEACH"
                                            checked={formData.role === 'TEACH'}
                                            onChange={handleChange}
                                        />
                                        강사
                                    </label>
                                </div>
                            </div>
                        </>
                    )}
                    <button type="submit" className="form-button">
                        {isLogin ? '로그인' : '회원가입'}
                    </button>
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
