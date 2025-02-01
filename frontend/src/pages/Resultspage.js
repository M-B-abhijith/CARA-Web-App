import React from 'react';
import { Link } from 'react-router-dom'; 
import "./Resultspage.css";

function Resultspage() {
  return (
    <div className="results-container">
      <div className="results-card">
        <h2>Your career opportunities are</h2>

        <div className="career-item">
          <div className="career-text">
            <span>Web Developer (90%)</span>
          </div>
          <Link to="/moreinfo" className="career-link">
            More info
          </Link>
        </div>

        <div className="career-item">
          <div className="career-text">
            <span>UI/UX Designer (87%)</span>
          </div>
          <Link to="/ui-ux-designer" className="career-link">
            More info
          </Link>
        </div>

        <div className="career-item">
          <div className="career-text">
            <span>Database Administrator (62%)</span>
          </div>
          <Link to="/database-administrator" className="career-link">
            More info
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Resultspage;
