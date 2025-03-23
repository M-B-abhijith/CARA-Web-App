import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./Moreinfo.css";
import { useParams } from "react-router-dom";
import roadmapsData from "../constants/roadmaps.json";

const Moreinfo = () => {
  const { careerTitle } = useParams();
  const [careerData, setCareerData] = useState(null);
  const [spotlightImage, setSpotlightImage] = useState(null);

  useEffect(() => {
    const encodedTitle = encodeURIComponent(careerTitle);
    axios
      .get(`http://localhost:5000/api/v1/careers/fetchingcareer/${encodedTitle}`)
      .then((response) => setCareerData(response.data.career))
      .catch((error) => console.error("Error fetching data:", error));
  }, [careerTitle]);

  if (!careerData) {
    return <p>Loading...</p>;
  }

  // Function to find the roadmap image
  const getRoadmapImage = (title) => {
    const roadmap = roadmapsData.find((r) => r.title === title);
    if (!roadmap) {
      console.error(`Roadmap not found for title: ${title}`);
      return null;
    }
    try {
      return require(`../roadmaps/${roadmap.image}`);
    } catch (error) {
      console.error(`Failed to load image: ${roadmap.image}`, error);
      return null;
    }
  };

  return (
    <div className="container">
      <div className="enclosedcontainer">
        <header className="header">
          <h1>{careerData.title}</h1>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => {
              const imagePath = getRoadmapImage(careerData.title);
              if (imagePath) {
                setSpotlightImage(imagePath);
              } else {
                alert(`Roadmap image for "${careerData.title}" not found.`);
              }
            }}
          >
            Roadmap
          </Button>
        </header>

        <div className="insidebox">
          <section className="section">
            <h2 className="subtitle">Job Overview</h2>
            <p>{careerData.jobOverview}</p>
          </section>

          <section className="section">
            <h2 className="subtitle">Average Salary</h2>
            {Object.entries(careerData.salary).map(([level, amount]) => (
              <div className="salarybox" key={level}>
                <p>{level.replace(/([A-Z])/g, " $1").trim()} Salary</p>
                <p>{amount}</p>
              </div>
            ))}
          </section>

          {/* Roadmap Spotlight Modal */}
          {spotlightImage && (
            <div className="modal-overlay" onClick={() => setSpotlightImage(null)}>
              <div className="floating-image-container" onClick={(e) => e.stopPropagation()}>
                <img src={spotlightImage} alt="Roadmap" className="modal-image" />
              </div>
            </div>
          )}

          {/* Styles */}
          <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.8);
              display: flex;
              align-items: flex-start;
              justify-content: center;
              overflow-y: auto;
              z-index: 1000;
            }

            .floating-image-container {
              position: relative;
              width: 55%;
              max-width: 55vw;
              text-align: center;
              animation: fadeIn 0.3s ease-in-out;
            }

            .modal-image {
              width: 100%;
              height: auto;
              display: block;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>

          <section className="section">
            <h2 className="subtitle">Key Responsibilities</h2>
            <ul className="list">
              {careerData.responsibilities.map((item, index) => (
                <li className="list-item" key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2 className="subtitle">Required Tech Stack</h2>
            {Object.entries(careerData.techStack).map(([category, items]) => (
              <div key={category}>
                <p><strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> {items.join(", ")}</p>
              </div>
            ))}
          </section>

          <section className="section">
            <h2 className="subtitle">Educational Background & Certifications</h2>
            <p><strong>Degree:</strong> {careerData.education.degree}</p>
            <p><strong>Certifications:</strong></p>
            <ul className="list">
              {careerData.education.certifications.map((cert, index) => (
                <li className="list-item" key={index}>{cert}</li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2 className="subtitle">Career Growth Opportunities</h2>
            <p>{careerData.careerGrowth.join(" → ")}</p>
          </section>

          <section className="section">
            <h2 className="subtitle">Pros</h2>
            <ul className="list">
              {careerData.prosAndCons.pros.map((pro, index) => (
                <li className="list-item" key={index}>{pro}</li>
              ))}
            </ul>
            <h2 className="subtitle">Cons</h2>
            <ul className="list">
              {careerData.prosAndCons.cons.map((con, index) => (
                <li className="list-item" key={index}>{con}</li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2 className="subtitle">Future Trends</h2>
            <ul className="list">
              {careerData.futureTrends.map((trend, index) => (
                <li className="list-item" key={index}>{trend}</li>
              ))}
            </ul>
          </section>

          <footer className="footer">
            <Button variant="contained" color="primary" sx={{ textTransform: "none" }}>
              Find Jobs
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Moreinfo;