import React from 'react';
import '../css/Recommendations.css';

const Recommendations = () => {
const recommendations = [
    '추천 교육 1', '추천 교육 2', '추천 교육 3', '추천 교육 4', '추천 교육 5',
];

return (    
        <section className="recommendations">
            <span>0원!! 유료 강의보다 좋은 무료 강의들 👀</span>   
                <div className="recommendation-list">
                {recommendations.map((item, index) => (
                    <div key={index} className="recommendation-card">{item}</div>
                ))}
                </div>
        </section>
    ); 
};

export default Recommendations;
