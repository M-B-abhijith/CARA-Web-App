import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Dashboardpage.css'; 

import Goal from '../assets/Goal.png';
import JobSeeker from '../assets/JobSeeker.png';

const Dashboardpage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleQuizClick = () => {
    navigate('/qnsec1'); // Navigate to the qnsec1 page
  };

  return (
    <div className="choosing-container">
      <div className="choosing-grid">
        <div className="choosing-card">
          <div className="choosing-icon">
            <img src={Goal} alt="Road Map Icon" />
          </div>
          <h2>Add Carreer</h2>
        </div>
        <div className="choosing-card" onClick={handleQuizClick}> {/* Add onClick handler to the Quiz card */}
          <div className="choosing-icon">
            <img src={JobSeeker} alt="Quiz Icon" />
          </div>
          <h2>Add jobpostings</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboardpage;
