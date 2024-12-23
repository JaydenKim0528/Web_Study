import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginPage.css';

const LoginPage = () => {
    // 페이지 이동
    const navigate = useNavigate();

    // 로그인/회원가입 상태 구분
    const [isLogin, setIsLogin] = useState(true);

    // 사용자 입력 폼 데이터
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        userName: '',
        role: 'user',
    });

    // 아이디 중복 결과 상태 관리
    const [userIdAvailable, setUserIdAvailable] = useState(null);

    // 아이디 중복 메세지 상태 관리
    const [userIdMessage, setUserIdMessage] = useState('');

    // 알림 메세지 상태 관리
    const [alert, setAlert] = useState({ type: '', message: '', visible: false });

    // 폼 데이터 초기화
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

    // 로그인/회원가입 변경 시 폼 데이터 초기화
    useEffect(() => {
        resetFormData();
    }, [isLogin]);

    // 아이디 중복 검사 딜레이 처리
    useEffect(() => {
        if (!isLogin && formData.userId.trim() !== '') {
            const timeoutId = setTimeout(() => {
                checkUserIdAvailability(formData.userId);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [formData.userId, isLogin]);

    // 입력 필드 변경
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 아이디 중복 확인
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

    // 폼 제출 처리
const handleSubmit = async (e) => {
    e.preventDefault();

    // 회원가입 처리
    if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
            setAlert({ type: 'danger', message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.', visible: true });
            return;
        }
        if (!userIdAvailable) {
            setAlert({ type: 'danger', message: '이미 사용 중인 아이디입니다.', visible: true });
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/api/register',
                {
                    userId: formData.userId,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    userName: formData.userName,
                    role: formData.role,
                },
                { withCredentials: true }
            );
            setAlert({ type: 'success', message: '회원가입 성공! 환영합니다.', visible: true });
            resetFormData();
            setIsLogin(true);
        } catch (error) {
            console.error('회원가입 실패:', error);
            setAlert({ type: 'danger', message: '회원가입에 실패했습니다. 다시 시도해주세요.', visible: true });
        }
    } else {
        // 로그인 처리
        try {
            const response = await axios.post(
                'http://localhost:8080/api/login',
                {
                    userId: formData.userId,
                    password: formData.password,
                    role: formData.role,
                },
                { withCredentials: true } // 쿠키 전달 허용
            );

            setAlert({ type: 'success', message: '로그인 성공! 환영합니다.', visible: true });

            window.dispatchEvent(new Event('loginStateChange'));

            resetFormData();
            setTimeout(() => navigate('/'), 50);
        } catch (error) {
            console.error('로그인 실패:', error);
            setAlert({ type: 'danger', message: '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.', visible: true });
        }
    }
};

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isLogin ? '로그인' : '회원가입'}</h2>
                {alert.visible && (
                    <div className={`alert alert-${alert.type} mt-3`} role="alert">
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
                            placeholder="아이디를 입력하세요"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        />
                        {!isLogin && (
                            <p className={`id-status ${userIdAvailable ? 'available' : 'unavailable'}`}>
                                {userIdMessage}
                            </p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">비밀번호 확인</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="비밀번호를 다시 입력하세요"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName">사용자 이름</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    placeholder="사용자 이름을 입력하세요"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label>유형</label>
                        <div className="role-type-select">
                            <div className="role-item">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    id="role-user"
                                    checked={formData.role === 'user'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="role-user" className="role-label">
                                    일반 사용자
                                </label>
                            </div>
                            <div className="role-item">
                                <input
                                    type="radio"
                                    name="role"
                                    value="teach"
                                    id="role-teach"
                                    checked={formData.role === 'teach'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="role-teach" className="role-label">
                                    강사
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="form-button" disabled={!isLogin && userIdAvailable === false}>
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
