// import React from 'react';
// import { Link } from 'react-router-dom'; 
// import "./Resultspage.css";

// function Resultspage() {
//   return (
//     <div className="results-container">
//       <div className="results-card">
//         <h2>Your career opportunities are</h2>

//         <div className="career-item">
//           <div className="career-text">
//             <span>Web Developer (90%)</span>
//           </div>
//           <Link to="/moreinfo" className="career-link">
//             More info
//           </Link>
//         </div>

//         <div className="career-item">
//           <div className="career-text">
//             <span>UI/UX Designer (87%)</span>
//           </div>
//           <Link to="/ui-ux-designer" className="career-link">
//             More info
//           </Link>
//         </div>

//         <div className="career-item">
//           <div className="career-text">
//             <span>Database Administrator (62%)</span>
//           </div>
//           <Link to="/database-administrator" className="career-link">
//             More info
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Resultspage;



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

        console.log("the format is :",requestData);

        // Make API call
        const response = await fetch('http://localhost:5001/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });


        console.log("the repsonse is :",response);

        if (!response.ok) throw new Error('Failed to get predictions');

        const data = await response.json();
        
        if (data.predictions && data.probabilities) {
          setPredictions(data.predictions);
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
          <button onClick={() => navigate('/')}>Try Again</button>
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
          const careerPath = career.toLowerCase().replace(/ /g, '-');

          return (
            <div className="career-item" key={career}>
              <div className="career-text">
                <span>{career} ({percentage}%)</span>
              </div>
              <Link to={`/moreinfo/${careerPath}`} className="career-link">
                More info
              </Link>
            </div>
          );
        })}

        <div className="navigation-buttons">
          <button onClick={() => navigate('/')} className="retry-button">
            Retake Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resultspage;

