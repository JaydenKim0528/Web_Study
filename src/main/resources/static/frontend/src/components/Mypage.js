import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Mypage.css';

import Dashboard from './Dashboard';
import Learning from './Learning';
import Account from './Account';
import CourseRegistration from './CourseRegistration';

const Mypage = () => {
    const { isLoggedIn, role } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('dashboard');
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 기본 카테고리 정의
    const defaultCategories = [
        { id: 'dashboard', name: '대시보드' },
        { id: 'learning', name: '내 학습' },
        { id: 'account', name: '계정 정보' },
    ];

    const [categories, setCategories] = useState(defaultCategories);

    // 로그인 상태와 역할 기반 카테고리 설정
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        if (role === 'TEACH') {
            setCategories((prev) => {
                const hasCourseRegistration = prev.some(
                    (category) => category.id === 'courseRegistration'
                );

                // 중복 추가 방지
                if (!hasCourseRegistration) {
                    return [
                        ...prev,
                        { id: 'courseRegistration', name: '강의 등록' },
                    ];
                }

                return prev;
            });
        }
    }, [isLoggedIn, role, navigate]);

    // 선택된 카테고리 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.post(
                    `http://localhost:8080/api/mypage/${selectedCategory}`
                );
                setCategoryData(data);
            } catch (error) {
                console.error('데이터 조회 실패:', error);
                setCategoryData({});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategory]);

    const renderContent = () => {
        if (loading) return <p>데이터를 불러오는 중...</p>;

        switch (selectedCategory) {
            case 'dashboard':
                return <Dashboard data={categoryData} />;
            case 'learning':
                return <Learning data={categoryData} />;
            case 'account':
                return <Account data={categoryData} />;
            case 'courseRegistration':
                return <CourseRegistration />;
            default:
                return <p>선택된 카테고리의 데이터를 표시할 수 없습니다.</p>;
        }
    };

    return (
        <div className="mypage">
            <div className="mypage-sidebar">
                <ul>
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={
                                selectedCategory === category.id ? 'active' : ''
                            }
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mypage-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Mypage;
