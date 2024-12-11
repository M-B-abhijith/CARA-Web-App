import React from 'react';
import './ChoosingPage.css'; 

import roadmapIcon from '../assets/roadmap-icon.png';
import quizIcon from '../assets/quiz-icon.png';

const ChoosingPage = () => {
  return (
    <div className="choosing-container">
      <div className="choosing-grid">
        <div className="choosing-card">
          <div className="choosing-icon">
            <img src={roadmapIcon} alt="Road Map Icon" />
          </div>
          <h2>Road Map</h2>
        </div>
        <div className="choosing-card">
          <div className="choosing-icon">
            <img src={quizIcon} alt="Quiz Icon" />
          </div>
          <h2>Quiz</h2>
        </div>
      </div>
    </div>
  );
};

export default ChoosingPage;
