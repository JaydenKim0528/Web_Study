import React, { useState } from 'react';
import '../css/LoginPage.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isLogin ? '로그인' : '회원가입'}</h2>
                <form>
                    {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="username">사용자 이름</label>
                        <input type="text" id="username" placeholder="사용자 이름을 입력하세요" />
                    </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" placeholder="이메일을 입력하세요" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
                    </div>
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
