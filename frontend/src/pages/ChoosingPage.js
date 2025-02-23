import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './ChoosingPage.css'; 

import roadmapIcon from '../assets/roadmap-icon.png';
import quizIcon from '../assets/quiz-icon.png';

const ChoosingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleQuizClick = () => {
    navigate('/qnsec1'); // Navigate to the qnsec1 page
  };

  const handleRoadMapClick = () => {
    navigate('/roadmappage'); // Navigate to the qnsec1 page
  };

  return (
    <div className="choosing-container">
      <div className="choosing-grid">
        <div className="choosing-card">
          <div className="choosing-icon" onClick={handleRoadMapClick}>
            <img src={roadmapIcon} alt="Road Map Icon" />
          </div>
          <h2>Road Map</h2>
        </div>
        <div className="choosing-card" onClick={handleQuizClick}> {/* Add onClick handler to the Quiz card */}
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
