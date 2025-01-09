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
        role: 'user',
    });
    const [userIdMessage, setUserIdMessage] = useState({ text: '', type: '' });
    const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState({ text: '', type: '' });
    const [alert, setAlert] = useState({ type: '', message: '', visible: false });

    // 유효성 검사 정규식
    const userIdRegex = /^(?=.*[a-z])[a-z0-9]{6,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    // 입력 초기화
    const resetFormData = () => {
        setFormData({
            userId: '',
            password: '',
            confirmPassword: '',
            userName: '',
            role: 'user',
        });
        setUserIdMessage({ text: '', type: '' });
        setPasswordMessage({ text: '', type: '' });
        setConfirmPasswordMessage({ text: '', type: '' });
        setAlert({ type: '', message: '', visible: false });
    };

    useEffect(() => resetFormData(), [isLogin]);

    // 아이디 중복 검사
    const checkUserIdAvailability = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/checkUserId`, {
                params: { userId },
            });
            if (response.data.available) {
                setUserIdMessage({ text: '사용 가능한 아이디입니다.', type: 'success' });
            } else {
                setUserIdMessage({ text: '이미 사용 중인 아이디입니다.', type: 'error' });
            }
        } catch (error) {
            setUserIdMessage({ text: '아이디 중복 검사 중 오류가 발생했습니다.', type: 'error' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (!isLogin) {
            if (name === 'userId') {
                if (!userIdRegex.test(value)) {
                    setUserIdMessage({ text: '아이디는 영문 소문자와 숫자로 6~20자리여야 합니다.', type: 'error' });
                } else {
                    checkUserIdAvailability(value);
                }
            }

            if (name === 'password') {
                if (!passwordRegex.test(value)) {
                    setPasswordMessage({ text: '비밀번호는 영문, 숫자, 특수문자를 포함해 8~20자여야 합니다.', type: 'error' });
                } else {
                    setPasswordMessage({ text: '사용 가능한 비밀번호입니다.', type: 'success' });
                }
            }

            if (name === 'confirmPassword') {
                if (value !== formData.password) {
                    setConfirmPasswordMessage({ text: '비밀번호가 일치하지 않습니다.', type: 'error' });
                } else {
                    setConfirmPasswordMessage({ text: '비밀번호가 일치합니다.', type: 'success' });
                }
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';

        try {
            await axios.post(`http://localhost:8080/api/${endpoint}`, formData, { withCredentials: true });
            setAlert({ type: 'success', message: isLogin ? '로그인 성공!' : '회원가입 성공!', visible: true });
            login(formData.userId);
            resetFormData();
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: `${isLogin ? '로그인' : '회원가입'}에 실패했습니다.`,
                visible: true,
            });
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
                        {!isLogin && userIdMessage.text && (
                            <p className={`status-message ${userIdMessage.type}`}>{userIdMessage.text}</p>
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
                        {!isLogin && passwordMessage.text && (
                            <p className={`status-message ${passwordMessage.type}`}>{passwordMessage.text}</p>
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
                                {confirmPasswordMessage.text && (
                                    <p className={`status-message ${confirmPasswordMessage.type}`}>
                                        {confirmPasswordMessage.text}
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
