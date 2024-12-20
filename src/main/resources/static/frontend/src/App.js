import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
// import ListPage from './components/ListPage';

const App = () => {
  return (
    <Router>
      <div id="root">
        <Header />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/list" element={<ListPage />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;