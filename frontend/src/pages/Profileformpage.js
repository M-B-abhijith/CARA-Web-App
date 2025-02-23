// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axios from "axios"; // Import axios for HTTP requests
// import { useNavigate } from "react-router-dom";

// // Create a custom theme with the color #9400d3
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#9400d3", // Custom violet color for primary elements
//     },
//     secondary: {
//       main: "#ff4081", // You can choose another color for secondary if needed
//     },
//   },
// });

// const ProfileForm = ({ onSubmit }) => {
//   const navigate = useNavigate(); // Initialize navigate

//   const [profileData, setProfileData] = useState({
//     name: "",
//     role: "",
//     contact: { email: "", phone: "" },
//     profileSummary: "",
//     skills: {
//       languages: [],
//       frameworks: [],
//       tools: [],
//       databases: [],
//       others: [],
//     },
//     projects: [],
//     education: [],
//     achievementsAndCertifications: [],
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false); // To show loading or disable submit

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // If the input name is inside the "contact" object (like contact.email or contact.phone)
//     if (name.includes('contact.')) {
//       const field = name.split('.')[1]; // Extract the field name (email or phone)
//       setProfileData((prevData) => ({
//         ...prevData,
//         contact: {
//           ...prevData.contact,
//           [field]: value, // Update the specific field in the contact object
//         },
//       }));
//     } else {
//       setProfileData({ ...profileData, [name]: value });
//     }
//   };

//   const handleNestedChange = (e, category) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       skills: {
//         ...prevData.skills,
//         [category]: value.split(",").map((item) => item.trim()),
//       },
//     }));
//   };

//   const handleArrayChange = (e, category) => {
//     const { value } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [category]: value.split(",").map((item) => item.trim()),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Set submitting state to true

//     console.log("inside handleSubmit");
//     console.log(profileData);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/profilesetup/profilecreate",
//         profileData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the token from localStorage
//           },
//         }
//       );
      

//       if (response.status === 201) {  //ithu 200 matti 201 njan aakiyathu aanu
//         alert("Profile created successfully!");
//         // Optionally, call the onSubmit prop if you want to update the parent component
//         // onSubmit(profileData); // Or use your own logic   //dont know why this was here i think this is making issue as even after successful it is not navigationg to profile

//         navigate("/Profilepage"); // Replace "/profile-form" with your desired path
//       }
//     } catch (error) {
//       console.error("Error submitting profile data:", error);
//       alert("There was an error creating the profile."); 
//     } finally {
//       setIsSubmitting(false); // Reset submitting state

//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div style={{ padding: "0% 15%", textAlign: "center" }}>
//         <form className="profile-form" onSubmit={handleSubmit}>
//           <h2 style={{ color: "#515151" }}>Build Your Profile</h2>

//           <TextField
//             label="Name"
//             name="name"
//             value={profileData.name}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//             color="primary" // Ensure the primary color is used
//           />
//           <TextField
//             label="Role"
//             name="role"
//             value={profileData.role}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//             color="primary" // Ensure the primary color is used
//           />
//           <TextField
//             label="Email"
//             name="contact.email" // Correct name to handle nested state for email
//             value={profileData.contact.email}
//             onChange={handleChange} // Use the updated handleChange
//             required
//             fullWidth
//             margin="normal"
//             color="primary"
//           />
//           <TextField
//             label="Phone"
//             name="contact.phone" // Correct name to handle nested state for phone
//             value={profileData.contact.phone}
//             onChange={handleChange} // Use the updated handleChange
//             required
//             fullWidth
//             margin="normal"
//             color="primary"
//           />
//           <TextField
//             label="Profile Summary"
//             name="profileSummary"
//             value={profileData.profileSummary}
//             onChange={handleChange}
//             multiline
//             rows={4}
//             fullWidth
//             margin="normal"
//             color="primary"
//           />

//           {["languages", "frameworks", "tools", "databases", "others"].map(
//             (category) => (
//               <TextField
//                 key={category}
//                 label={`Skills (${category})`}
//                 name={category}
//                 value={profileData.skills[category].join(", ")}
//                 onChange={(e) => handleNestedChange(e, category)}
//                 fullWidth
//                 margin="normal"
//                 color="primary"
//               />
//             )
//           )}

//           <TextField
//             label="Projects"
//             name="projects"
//             value={profileData.projects.join(", ")}
//             onChange={(e) => handleArrayChange(e, "projects")}
//             fullWidth
//             margin="normal"
//             color="primary"
//           />

//           <TextField
//             label="Education"
//             name="education"
//             value={profileData.education.join(", ")}
//             onChange={(e) => handleArrayChange(e, "education")}
//             fullWidth
//             margin="normal"
//             color="primary"
//           />

//           <TextField
//             label="Achievements and Certifications"
//             name="achievementsAndCertifications"
//             value={profileData.achievementsAndCertifications.join(", ")}
//             onChange={(e) => handleArrayChange(e, "achievementsAndCertifications")}
//             fullWidth
//             margin="normal"
//             color="primary"
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             style={{ marginTop: "20px", width: "100%", fontWeight: "bold" }}
//             disabled={isSubmitting} // Disable button while submitting
//           >
//             {isSubmitting ? "Submitting..." : "Submit"} {/* Show submitting text */}
//           </Button>
//         </form>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default ProfileForm;



import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    primary: { main: "#9400d3" },
    secondary: { main: "#666666" },
  },
});

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    contact: { email: "", phone: "" },
    profileSummary: "",
    skills: {
      languages: [],
      frameworks: [],
      tools: [],
      databases: [],
      others: [],
    },
    projects: [],
    education: [],
    achievements: [],
  });

  const [openModal, setOpenModal] = useState({ projects: false, education: false, achievements: false });
  
  const [tempProjects, setTempProjects] = useState({ title: "", description: "" });
  const [tempEducation, setTempEducation] = useState({ course: "", institution: "", year: "" });
  const [tempAchievements, setTempAchievements] = useState({ title: "", description: "" });

  const [tempSkill, setTempSkill] = useState({ category: "languages", skill: "" });


  const handleModalOpen = (category) => {
    setOpenModal((prev) => ({ ...prev, [category]: true }));
  };

  const handleModalClose = (category) => {
    setOpenModal((prev) => ({ ...prev, [category]: false }));
    if (category === "projects") setTempProjects({ title: "", description: "" });
    if (category === "education") setTempEducation({ course: "", institution: "", year: "" });
    if (category === "achievements") setTempAchievements({ title: "", description: "" });
  };

  const handleNestedChange = (e, category) => {
    const newSkills = e.target.value.split(",").map(skill => skill.trim());
    setProfileData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [category]: newSkills },
    }));
  };



  const handleAddData = (category) => {
    setProfileData((prev) => ({
      ...prev,
      [category]: [
        ...prev[category],
        category === "projects" ? { ...tempProjects } :
        category === "education" ? { ...tempEducation } :
        { ...tempAchievements }
      ],
    }));
    handleModalClose(category);
  };

  const handleSubmit = async (e) => {


    console.log("the profile data now is ",profileData);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/profilesetup/profilecreate", profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      if (response.status === 201) {
        alert("Profile created successfully!");
        navigate("/Profilepage");
      }
    } catch (error) {
      console.error("Error submitting profile data:", error);
      alert("There was an error creating the profile.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
            Build Your Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" fullWidth margin="normal" onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} required />
            <TextField label="Role" fullWidth margin="normal" onChange={(e) => setProfileData({ ...profileData, role: e.target.value })} required />
            <TextField label="Email" fullWidth margin="normal" onChange={(e) => setProfileData({ ...profileData, contact: { ...profileData.contact, email: e.target.value } })} required />
            <TextField label="Phone" fullWidth margin="normal" onChange={(e) => setProfileData({ ...profileData, contact: { ...profileData.contact, phone: e.target.value } })} required />
            <TextField label="Profile Summary" fullWidth multiline rows={4} margin="normal" onChange={(e) => setProfileData({ ...profileData, profileSummary: e.target.value })} />


{/* Skills Section */}
<Typography variant="h6">Skills</Typography>
            {["languages", "frameworks", "tools", "databases", "others"].map(
              (category) => (
                <TextField
                  key={category}
                  label={`Skills (${category})`}
                  name={category}
                  value={profileData.skills[category].join(", ")}
                  onChange={(e) => handleNestedChange(e, category)}
                  fullWidth
                  margin="normal"
                  color="primary"
                />
              )
            )}





            {["projects", "education", "achievements"].map((category) => (
              <div key={category}>
                <Typography variant="h6">{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
                {profileData[category].map((item, index) => (
                  <Typography key={index} style={{ marginBottom: "5px" }}>
                    {category === "education" ? `${item.course} - ${item.institution} (${item.year})` : `${item.title} - ${item.description}`}
                  </Typography>
                ))}
                <Button style={{ margin: "15px 0px" }} onClick={() => handleModalOpen(category)} variant="outlined" color="secondary" startIcon={<AddCircleIcon />}>
                  Add {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              </div>
            ))}

            {["projects", "education", "achievements"].map((category) => (
              <Dialog key={category} open={openModal[category]} onClose={() => handleModalClose(category)}>
                <DialogTitle>Add {category.charAt(0).toUpperCase() + category.slice(1)}</DialogTitle>
                <DialogContent>
                  {category === "education" ? (
                    <>
                      <TextField label="Course" fullWidth margin="normal" onChange={(e) => setTempEducation({ ...tempEducation, course: e.target.value })} />
                      <TextField label="Institution" fullWidth margin="normal" onChange={(e) => setTempEducation({ ...tempEducation, institution: e.target.value })} />
                      <TextField label="Year" fullWidth margin="normal" onChange={(e) => setTempEducation({ ...tempEducation, year: e.target.value })} />
                    </>
                  ) : (
                    <>
                      <TextField label="Title" fullWidth margin="normal" onChange={(e) => category === "projects" ? setTempProjects({ ...tempProjects, title: e.target.value }) : setTempAchievements({ ...tempAchievements, title: e.target.value })} />
                      <TextField label="Description" multiline rows={2} fullWidth margin="normal" onChange={(e) => category === "projects" ? setTempProjects({ ...tempProjects, description: e.target.value }) : setTempAchievements({ ...tempAchievements, description: e.target.value })} />
                    </>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleAddData(category)} color="primary">Submit</Button>
                </DialogActions>
              </Dialog>
            ))}
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px", fontWeight: "bold" }}>Submit</Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ProfileForm;
