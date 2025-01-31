// import React from "react";
// import { Button } from "@mui/material";
// import "./Moreinfo.css";

// const Moreinfo = () => {
//   return (
//     <div className="container">
//       <div className="enclosedcontainer">

//         <header className="header">
//           <h1>Web Developer</h1>
//           <Button variant="contained" sx={{ textTransform: 'none' }}>Roadmap</Button>
//         </header>

//         <div className="insidebox">

//           <section className="section">
//             <h2 className="subtitle">Job Overview</h2>
//             <p>
//               A web developer is responsible for building and maintaining websites and
//               web applications. They work on both the front end (client side) and back
//               end (server side) of web development, ensuring functionality,
//               performance, and an engaging user experience. Depending on their
//               specialization, web developers may focus on front-end development (UI/UX)
//               or back-end development (server, databases).
//             </p>
//           </section>

//           <section className="section">
//             <h2 className="subtitle">Average Salary</h2>
//             <div className="salarybox">
//               <p>Entry-Level Salary</p>
//               <p>$50,000-$70,000</p>
//             </div>
//             <div className="salarybox">
//               <p>Entry-Level Salary</p>
//               <p>$50,000-$70,000</p>
//             </div>
//             <div className="salarybox">
//               <p>Entry-Level Salary</p>
//               <p>$50,000-$70,000</p>
//             </div>
//           </section>

//           <section className="section">
//             <h2 className="subtitle">Key Responsibilities</h2>
//             <ul className="list">
//               <li className="list-item">Designing and developing web pages and applications</li>
//               <li className="list-item">Writing clean, maintainable code in HTML, CSS, and JavaScript</li>
//               <li className="list-item">Testing and debugging applications across different browsers</li>
//               <li className="list-item">Collaborating with designers and back-end developers</li>
//               <li className="list-item">Optimizing websites for performance, speed, and scalability</li>
//               <li className="list-item">Ensuring websites are mobile responsive and user-friendly</li>
//             </ul>
//           </section>

//           <section className="section">
//             <h2 className="subtitle">Required Tech Stack</h2>
//             <ul className="list">
//               <li className="list-item">Languages: HTML, CSS, JavaScript</li>
//               <li className="list-item">Frameworks: React, Angular, Vue, Node, Express</li>
//               <li className="list-item">Tools: Git, Webpack, Babel</li>
//               <li className="list-item">Databases: MySQL, MongoDB</li>
//               <li className="list-item">Other Technologies: APIs, RESTful Services, GraphQL, Docker</li>
//             </ul>
//           </section>

//           <section className="section">
//             <h2 className="subtitle">Educational Background & Certifications</h2>
//             <p>
//               <span style={{ fontWeight: 600 }}>Degree:</span> Bachelor’s in Computer Science, Information Technology, or a related field
//             </p>
//             <p><span style={{ fontWeight: 600 }}>Certifications:</span></p>
//             <ul className="list">
//               <li className="list-item">FreeCodeCamp Certifications (Web Design, JavaScript Algorithms)</li>
//               <li className="list-item">Google Mobile Web Specialist</li>
//               <li className="list-item">Udacity Front-End Web Developer Nanodegree</li>
//             </ul>
//           </section>

//           <section className="section">
//             <h2 className="subtitle">Career Growth Opportunities</h2>
//             <p><span style={{ fontWeight: 600 }}>Junior Web Developer → Senior Web Developer → Lead Web Developer → Full-Stack Developer</span></p>
//           </section>

//           <section className="section">
//             <h2 className="subtitle">Pros</h2>
//             <div className="pros-cons-box pros">
//               <ul className="list">
//                 <li className="list-item">High demand for web developers with varied skill sets</li>
//                 <li className="list-item">Potential to work freelance or remotely</li>
//                 <li className="list-item">Opportunities to work on diverse projects across industries</li>
//                 <li className="list-item">Constantly evolving technology keeps the work interesting</li>
//               </ul>
//             </div>
//             <h2 className="subtitle">Cons</h2>

//             <div className="pros-cons-box cons">
//               <ul className="list">
//                 <li className="list-item">Need for continuous learning due to rapid changes in technology</li>
//                 <li className="list-item">Debugging and testing can be time-consuming and tedious</li>
//                 <li className="list-item">Competitive industry, especially for entry-level positions</li>
//                 <li className="list-item">Deadlines can lead to long working hours</li>
//               </ul>
//             </div>
//           </section>

//           <section className="section">
//             <h2 className="subtitle">Future Trends</h2>
//             <ul className="list">
//               <li className="list-item">Progressive Web Apps (PWA): Offering mobile-like experiences on the web</li>
//               <li className="list-item">WebAssembly: Faster execution of code in web browsers</li>
//               <li className="list-item">AI in Web Development: Integration of AI to personalize user experience</li>
//               <li className="list-item">
//                 No-Code/Low-Code Platforms: Allowing non-developers to create websites, reducing the demand for basic web development but increasing demand for more complex and customized development.
//               </li>
//             </ul>
//           </section>

//           <footer className="footer">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>Find Jobs</Button>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Moreinfo;




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
