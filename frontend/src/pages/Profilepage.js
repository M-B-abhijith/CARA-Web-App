// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import profilepicsample from "../assets/profilepicsample.png";
// import "./Profilepage.css";
// import SetupProfilePrompt from "../components/SetupProfilePrompt";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       console.log("Inside useEffect, fetching data");
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/profilesetup/getprofile",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           }
//         );
//         console.log(response.data);
//         setProfile(response.data.profile || null);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         setProfile(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleCreateProfile = () => {
//     navigate("/create-profile");
//   };

//   const handleDownloadPDF = () => {
//     const profileDetails = document.querySelector(".profile-details");
//     const downloadButton = document.querySelector(".download-button-container");

//     downloadButton.style.display = "none";

//     html2canvas(profileDetails, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("ProfilePage.pdf");

//       downloadButton.style.display = "flex";
//     });
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!profile) {
//     return (
//       <div>
//         <SetupProfilePrompt onCreateProfile={handleCreateProfile} />
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-summary">
//         <div className="profile-details">
//           <div className="profile-card">
//             <div className="profile-image-container">
//               <img className="profile-image" src={profilepicsample} alt="User" />
//             </div>
//             <div className="profileheaderdetails">
//               <h2>{profile.name || "N/A"}</h2>
//               <div className="anotherdiv2">
//                 <p style={{ fontWeight: "600" }}>{profile.role || "N/A"}</p>
//                 <div className="anotherdiv">
//                   <p>{profile.contact?.email || "Email not provided"}</p>
//                   <p style={{ marginLeft: "15px" }}>{profile.contact?.phone || "Phone not provided"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <hr />

//           <h3>Profile Summary</h3>
//           <p>{profile.profileSummary || "No summary available"}</p>

//           <h3 className="skillheading">Skills</h3>
//           <div className="skills-section">
//             {["languages", "frameworks", "tools", "databases", "others"].map((category) => (
//               <div key={category}>
//                 <h4>{category.charAt(0).toUpperCase() + category.slice(1)}:</h4>
//                 <span>{profile.skills?.[category]?.join(", ") || "None listed"}</span>
//               </div>
//             ))}
//           </div>

//           <h3>Projects</h3>
//           <ul>
//             {profile.projects?.length > 0
//               ? profile.projects.map((project, index) => <li key={index}>{project}</li>)
//               : <li>No projects listed</li>}
//           </ul>

//           <h3>Education</h3>
//           <ul>
//             {profile.education?.length > 0
//               ? profile.education.map((edu, index) => <li key={index}>{edu}</li>)
//               : <li>No education details provided</li>}
//           </ul>

//           <h3>Achievements and Certifications</h3>
//           <ul>
//             {profile.achievementsAndCertifications?.length > 0
//               ? profile.achievementsAndCertifications.map((achievement, index) => <li key={index}>{achievement}</li>)
//               : <li>No achievements or certifications listed</li>}
//           </ul>

//           <div className="download-button-container">
//             <Button
//               variant="contained"
//               color="primary"
//               className="download-button"
//               onClick={handleDownloadPDF}
//             >
//               Download
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import profilepicsample from "../assets/profilepicsample.png";
import "./Profilepage.css";
import SetupProfilePrompt from "../components/SetupProfilePrompt";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/profilesetup/getprofile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setProfile(response.data.profile || null);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCreateProfile = () => navigate("/create-profile");

  const handleEditProfile = () => {
    navigate("/ProfileForm", { state: { profile } });
  };

const handleDownloadPDF = () => {
  const profileDetails = document.querySelector(".profile-details");
  const downloadButton = document.querySelector(".download-button-container");
  const editButton = document.querySelector(".edit-button");

  // Hide the buttons before capturing the PDF
  downloadButton.style.display = "none";
  editButton.style.display = "none";

  html2canvas(profileDetails, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ProfilePage.pdf");

    // Restore button visibility after capturing
    downloadButton.style.display = "flex";
    editButton.style.display = "block";
  });
};

  if (isLoading) return <div>Loading...</div>;
  if (!profile)
    return <SetupProfilePrompt onCreateProfile={handleCreateProfile} />;

  return (
    <div className="profile-container">
      <div className="profile-summary">
        <div className="profile-details">
        {/* <Button
            variant="contained"
            color="secondary"
            className="edit-button"
            onClick={handleEditProfile}
            sx={{
              position: "absolute",
              top: { xs: "10%", sm: "12%", md: "13%" }, // Adjust top position for different screen sizes
              right: { xs: "5%", sm: "10%", md: "23%" }, // Adjust right position accordingly
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // Responsive font size
              padding: { xs: "5px 10px", sm: "8px 15px" }, // Adjust padding
            }}
          >
            <EditIcon /> Edit
          </Button> */}


          <div className="profile-card">
            <div className="profile-image-container">
              <img
                className="profile-image"
                src={profilepicsample}
                alt="User"
              />
            </div>
            <div className="profileheaderdetails">
              <h2>{profile.name || "N/A"}</h2>
              <div className="anotherdiv2">
                <p style={{ fontWeight: "600" }}>{profile.role || "N/A"}</p>
                <div className="anotherdiv">
                  <p>{profile.contact?.email || "Email not provided"}</p>
                  <p style={{ marginLeft: "15px" }}>
                    {profile.contact?.phone || "Phone not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <h3>Profile Summary</h3>
          <p>{profile.profileSummary || "No summary available"}</p>

          <h3 className="skillheading">Skills</h3>
          <div className="skills-section">
  {Object.keys(profile.skills || {}).map((category) => (
    <div key={category}>
      <h4>{category.charAt(0).toUpperCase() + category.slice(1)}:</h4>
      <div>
        {profile.skills[category]?.length > 0
          ? profile.skills[category].map((skill, index) => (
              <span 
                key={index} 
                style={{ color: "white", marginRight: "10px",marginTop:"25px" }}
              >
                {skill}
              </span>
            ))
          : "None listed"}
      </div>
    </div>
  ))}
</div>

          <h3>Projects</h3>
          <ul>
            {profile.projects?.length > 0 ? (
              profile.projects.map((project, index) => (
                <li key={index}>
                  <strong>{project.title}</strong>: {project.description}
                </li>
              ))
            ) : (
              <li>No projects listed</li>
            )}
          </ul>

          <h3>Education</h3>
          <ul>
            {profile.education?.length > 0 ? (
              profile.education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.course}</strong> at {edu.institution} ({edu.year}
                  )
                </li>
              ))
            ) : (
              <li>No education details provided</li>
            )}
          </ul>

          <h3>Achievements</h3>
          <ul>
            {profile.achievements?.length > 0 ? (
              profile.achievements.map((achievement, index) => (
                <li key={index}>
                  <strong>{achievement.title}</strong>:{" "}
                  {achievement.description}
                </li>
              ))
            ) : (
              <li>No achievements listed</li>
            )}
          </ul>

          <div className="download-button-container">
            <Button
              variant="contained"
              color="primary"
              className="download-button"
              onClick={handleDownloadPDF}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
