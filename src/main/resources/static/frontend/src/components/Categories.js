import React from 'react';
import '../css/Categories.css';

const categories = [
    { name: '# UX UI', icon: '/images/ux-ui.png' },
    { name: '# 부트캠프', icon: '/images/bootcamp.png' },
    { name: '# 신규강의', icon: '/images/new-course.png' },
    { name: '# 스프링', icon: '/images/spring.png' },
    { name: '# 파이썬', icon: '/images/python.png' },
    { name: '# 게임개발', icon: '/images/game-dev.png' },
    { name: '# ChatGPT', icon: '/images/chatgpt.png' },
    { name: '# 데이터', icon: '/images/data.png' },
];

const Categories = () => {
    return (
        <section className="categories">
            <div className="category-list">
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <img src={category.icon} alt={category.name} className="category-icon" />
                        <span className="category-text">{category.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
