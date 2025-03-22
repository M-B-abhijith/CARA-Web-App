import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const [hover, setHover] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // getting the window size based on device
  const navigate = useNavigate(); 

  // Toggle hover state on mouse enter and leave
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleButtonClick = () => {
    navigate('/login');
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Update the width
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Clean up
  }, []);

  // Adjust styles based on window size
  const isMobile = windowWidth < 768;

  return (
    <div className="home-container">
      <div className="hero-section">
        <h2 className={`hero-text ${isMobile ? 'mobile' : ''}`}>
          “Discover Your Perfect Tech Career Path with CARA”
        </h2>
      </div>

      <p className={`description ${isMobile ? 'mobile' : ''}`}>
        Struggling to choose a career? Let us help you make the right choice based on your aptitude and personality.
      </p>

      <button
        className={`custom-button ${hover ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
