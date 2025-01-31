

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./Moreinfo.css";

const Moreinfo = () => {
  const [careerData, setCareerData] = useState(null);
  // const careerTitle = "Web Developer"; // Set this dynamically if needed

  useEffect(() => {
    axios
      // .get(`http://localhost:5000/api/v1/careers/fetchingcareer/${careerTitle}`)
      .get(`http://localhost:5000/api/v1/careers/fetchingcareer/`)

      .then((response) => setCareerData(response.data.career))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!careerData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="enclosedcontainer">
        <header className="header">
          <h1>{careerData.title}</h1>
          <Button variant="contained" sx={{ textTransform: "none" }}>Roadmap</Button>
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
            <Button variant="contained" color="primary" sx={{ textTransform: "none" }}>Find Jobs</Button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Moreinfo;
