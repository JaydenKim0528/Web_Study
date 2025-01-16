// Mypage Dashboard Component
import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [currentCourses, setCurrentCourses] = useState([]); // 현재 학습 중인 강의
  const [weeklyProgress, setWeeklyProgress] = useState([]); // 학습한 날짜 표시

  useEffect(() => {
    // Sample fetch functions (replace with real API calls)
    const fetchCurrentCourses = async () => {
      const response = await fetch('http://localhost:8080/api/current-courses');
      const data = await response.json();
      setCurrentCourses(data);
    };

    const fetchWeeklyProgress = async () => {
      const response = await fetch('http://localhost:8080/api/weekly-progress');
      const data = await response.json();
      setWeeklyProgress(data);
    };

    fetchCurrentCourses();
    fetchWeeklyProgress();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>My Dashboard</h1>

      <section className="current-courses">
        <h2>Currently Learning</h2>
        <ul>
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <li key={index}>{course.name}</li>
            ))
          ) : (
            <p>No courses currently in progress.</p>
          )}
        </ul>
      </section>

      <section className="weekly-progress">
        <h2>Weekly Progress</h2>
        <div className="calendar">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div
              key={index}
              className={`day ${weeklyProgress.includes(day) ? 'completed' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
