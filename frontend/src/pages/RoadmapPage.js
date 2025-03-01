// import React, { useState } from "react";
// import roadmapsData from "../constants/roadmaps.json";
// import { Button, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";

// const Roadmap = () => {
//   const [spotlightImage, setSpotlightImage] = useState(null);
//   const navigate = useNavigate();


  
//   const getImagePath = (imageName) => {
//     try {
//       return require(`../constants/${imageName}`);
//     } catch (error) {
//       console.error("Image not found:", imageName);
//       return null;
//     }
//   };

//   return (
//     <div className="job-listings-container">
//       <div className="job-listings-card">
//         <h2>Career Informations and Roadmaps</h2>

//         {roadmapsData.map((roadmap) => (
//           <div className="job-item" key={roadmap.id}>
//             <div className="job-details">
//               <p className="job-title">{roadmap.title}</p>
//             </div>

//             <div>
//               <Button
//                 sx={{ marginRight: "15px", textTransform: "none" }}
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => navigate(`/moreinfo`)}
//               >
//                 More Info
//               </Button>
//               <Button
//                 sx={{ textTransform: "none" }}
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => setSpotlightImage(getImagePath(roadmap.image))}
//               >
//                 View RoadMap
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div> 


        
      

//       {/* Floating Image Modal (At the Top) */}
//       {spotlightImage && (
//         <div className="modal-overlay">
//           <div className="floating-image-container">
//             <IconButton className="close-button" onClick={() => setSpotlightImage(null)}>
//               <CloseIcon style={{ color: "black", fontSize: 24 }} />
//             </IconButton>
//             <img src={spotlightImage} alt="Roadmap" className="modal-image" />
//           </div>
//         </div>
//       )}

//       {/* CSS inside the component */}
//       <style jsx>{`
//         /* Page Container */
//         .job-listings-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 90vh;
//           background: white;
//           color: #333;
//           padding: 20px;
//         }

//         /* Card */
//         .job-listings-card {
//           width: 80%;
//           max-width: 900px;
//           background: #ffffff;
//           padding: 20px;
//           border-radius: 10px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//         }

//         /* Job Item */
//         .job-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           background: #f9f9f9;
//           padding: 15px;
//           border-radius: 8px;
//           margin: 10px 0;
//           border: 1px solid #ddd;
//           transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
//         }

        

//         /* Job Title */
//         .job-title {
//           font-size: 18px;
//           font-weight: bold;
//           margin-bottom: 5px;
//           color: #333;
//         }

//         /* Floating Image Modal */
//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: flex-start; /* Align at the top */
//           justify-content: center;
//           padding-top: 20px; /* Add space from the top */
//           z-index: 1000;
//         }

//         /* Floating Image Box */
//         .floating-image-container {
//           position: relative;
//           background: white;
//           padding: 10px;
//           border-radius: 10px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//           max-width: 90%;
//           text-align: center;
//           animation: fadeIn 0.3s ease-in-out;
//         }

//         /* Close Button (Top Right of Image) */
//         .close-button {
//           position: absolute !important;
//           top: -10px;
//           right: -10px;
//           background: white;
//           border-radius: 50%;
//           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
//         }

//         /* Modal Image */
//         .modal-image {
//           max-width: 100%;
//           max-height: 60vh;
//           border-radius: 10px;
//         }

//         /* Fade-in Animation */
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Roadmap;


import React, { useState } from "react";
import roadmapsData from "../constants/roadmaps.json";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Roadmap = () => {
  const [spotlightImage, setSpotlightImage] = useState(null);
  const navigate = useNavigate();

  // Function to get image path from public folder
  const getImagePath = (imageId) => {
    const url = `https://lh3.googleusercontent.com/d/${imageId}=s0`;
    console.log("Generated Image URL:", url);
    return url;
  };
  
  

  return (
    <div className="job-listings-container">
      <div className="job-listings-card">
        <h2>Career Informations and Roadmaps</h2>

        {roadmapsData.map((roadmap) => (
          <div className="job-item" key={roadmap.id}>
            <div className="job-details">
              <p className="job-title">{roadmap.title}</p>
            </div>

            <div>
              <Button
                sx={{ marginRight: "15px", textTransform: "none" }}
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/moreinfo/${encodeURIComponent(roadmap.title)}`)}
                >
                More Info
              </Button>
              <Button
  sx={{ textTransform: "none" }}
  variant="contained"
  color="secondary"
  onClick={() => setSpotlightImage(getImagePath(roadmap.image))}
>
  View RoadMap
</Button>

            </div>
          </div>
        ))}
      </div> 

      {/* Floating Image Modal (At the Top) */}
      {spotlightImage && (
        <div className="modal-overlay" onClick={() => setSpotlightImage(null)}>
          <div className="floating-image-container" onClick={(e) => e.stopPropagation()}>
            {/* <IconButton className="close-button" onClick={() => setSpotlightImage(null)}>
              <CloseIcon style={{ color: "black", fontSize: 24 }} />
            </IconButton> */}
            <img src={spotlightImage} alt="Roadmap" className="modal-image" />
          </div>
        </div>
      )}

      {/* CSS inside the component */}
      <style jsx>{`
  .job-listings-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    background: white;
    color: #333;
    padding: 20px;
  }

  .job-listings-card {
    width: 80%;
    max-width: 900px;
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .job-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
    border: 1px solid #ddd;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .job-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }

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
    background: none;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
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

  .close-button {
    position: fixed !important;
    top: 20px;
    right: 250px;
    background: white;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 1100;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`}</style>



    </div>
  );
};

export default Roadmap;
