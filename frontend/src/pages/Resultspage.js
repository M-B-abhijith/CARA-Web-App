import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Resultspage.css";

function Resultspage() {
  const [predictions, setPredictions] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        // Get stored data from both sections
        const academicData = JSON.parse(localStorage.getItem('marks'));
        const personalityData = JSON.parse(localStorage.getItem('personalityAnswers'));

        // Combine data for API request
        const requestData = { ...academicData, ...personalityData };

        console.log("the format is :", requestData);

        // Make API call
        const response = await fetch('http://localhost:5001/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        console.log("the response is :", response);

        if (!response.ok) throw new Error('Failed to get predictions');

        const data = await response.json();
        
        // Handle 'predicted_roles' from API response
        if (data.predicted_roles && data.probabilities) {
          setPredictions(data.predicted_roles);
          setProbabilities(data.probabilities);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <div className="results-container">
        <div className="results-card">
          <h2>Analyzing your results...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container">
        <div className="results-card">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/Qnsec1')}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-card">
        <h2>Your career opportunities are</h2>

        {predictions.map((career, index) => {
          const percentage = Math.round(probabilities[index] * 100);
          // Use career as roadmap.title for the link
          const roadmap = { title: career };

          return (
            <div className="career-item" key={career}>
              <div className="career-text">
                <span>{career} ({percentage}%)</span>
              </div>
              <Link
                to={`/moreinfo/${encodeURIComponent(roadmap.title)}`}
                className="career-link"
              >
                More info
              </Link>
            </div>
          );
        })}

        <div className="navigation-buttons">
          <button onClick={() => navigate('/Qnsec1')} className="retry-button">
            Retake Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resultspage;