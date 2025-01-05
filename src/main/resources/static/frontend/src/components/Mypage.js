import React, { useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Mypage.css';

import Dashboard from './Dashboard';
import Learning from './Learning';
import Account from './Account';
import CourseRegistration from './CourseRegistration';

const Mypage = () => {
    const [selectedCategory, setSelectedCategory] = useState('dashboard');
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    const defaultCategories = useMemo(() => [
        { id: 'dashboard', name: '대시보드' },
        { id: 'learning', name: '내 학습' },
        { id: 'account', name: '계정 정보' },
    ], []);

    const [categories, setCategories] = useState(defaultCategories);

    const getTokenData = () => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            console.error('토큰이 없습니다.');
            navigate('/login');
            return null;
        }

        try {
            const decodedToken = jwtDecode(token);
            return { ...decodedToken, token }; // 디코딩된 토큰과 원본 토큰 반환
        } catch (error) {
            console.error('JWT 디코딩 실패:', error);
            navigate('/login');
            return null;
        }
    };

    useEffect(() => {
        const tokenData = getTokenData();
        if (!tokenData) return;
        
        const { role } = tokenData;
        setRole(role);

        const updatedCategories = [...defaultCategories];
        if (role === 'teach') {
            updatedCategories.push({ id: 'courseRegistration', name: '강의 등록' });
        }
        setCategories(updatedCategories);
    }, [defaultCategories, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const tokenData = getTokenData();
                if (!tokenData) return;

                const { userNo, userId, role, token } = tokenData;
                console.log('userNo : ', userNo);
                console.log('userId : ', userId);
                console.log('role : ', role);

                const { data } = await axios.post(`http://localhost:8080/api/mypage/${selectedCategory}`);

                setCategoryData(data);
            } catch (error) {
                console.error('데이터 조회 실패:', error);
                setCategoryData({});
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [selectedCategory, navigate]);

    

    const renderContent = () => {
        console.log('현재 선택된 카테고리:', selectedCategory); // 디버깅용
        if (loading) return <p>데이터를 불러오는 중...</p>;
        // if (!categoryData || Object.keys(categoryData).length === 0) return <p>데이터가 없습니다.</p>;
    
        switch (selectedCategory) {
            case 'dashboard':
                console.log('Dashboard 렌더링');
                return <Dashboard data={categoryData} />;
            case 'learning':
                console.log('Learning 렌더링');
                return <Learning data={categoryData} />;
            case 'account':
                console.log('Account 렌더링');
                return <Account data={categoryData} />;
            case 'courseRegistration':
                console.log('CourseRegistration 렌더링'); // 디버깅용
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
                            className={selectedCategory === category.id ? 'active' : ''}
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
