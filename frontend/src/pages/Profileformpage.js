import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom";

// Create a custom theme with the color #9400d3
const theme = createTheme({
  palette: {
    primary: {
      main: "#9400d3", // Custom violet color for primary elements
    },
    secondary: {
      main: "#ff4081", // You can choose another color for secondary if needed
    },
  },
});

const ProfileForm = ({ onSubmit }) => {
  const navigate = useNavigate(); // Initialize navigate

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
    achievementsAndCertifications: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To show loading or disable submit

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input name is inside the "contact" object (like contact.email or contact.phone)
    if (name.includes('contact.')) {
      const field = name.split('.')[1]; // Extract the field name (email or phone)
      setProfileData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [field]: value, // Update the specific field in the contact object
        },
      }));
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        [category]: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  const handleArrayChange = (e, category) => {
    const { value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [category]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    console.log("inside handleSubmit");
    console.log(profileData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/profilesetup/profilecreate",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the token from localStorage
          },
        }
      );
      

      if (response.status === 201) {  //ithu 200 matti 201 njan aakiyathu aanu
        alert("Profile created successfully!");
        // Optionally, call the onSubmit prop if you want to update the parent component
        // onSubmit(profileData); // Or use your own logic   //dont know why this was here i think this is making issue as even after successful it is not navigationg to profile

        navigate("/Profilepage"); // Replace "/profile-form" with your desired path
      }
    } catch (error) {
      console.error("Error submitting profile data:", error);
      alert("There was an error creating the profile."); 
    } finally {
      setIsSubmitting(false); // Reset submitting state

    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "0% 15%", textAlign: "center" }}>
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2 style={{ color: "#515151" }}>Build Your Profile</h2>

          <TextField
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            color="primary" // Ensure the primary color is used
          />
          <TextField
            label="Role"
            name="role"
            value={profileData.role}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            color="primary" // Ensure the primary color is used
          />
          <TextField
            label="Email"
            name="contact.email" // Correct name to handle nested state for email
            value={profileData.contact.email}
            onChange={handleChange} // Use the updated handleChange
            required
            fullWidth
            margin="normal"
            color="primary"
          />
          <TextField
            label="Phone"
            name="contact.phone" // Correct name to handle nested state for phone
            value={profileData.contact.phone}
            onChange={handleChange} // Use the updated handleChange
            required
            fullWidth
            margin="normal"
            color="primary"
          />
          <TextField
            label="Profile Summary"
            name="profileSummary"
            value={profileData.profileSummary}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            color="primary"
          />

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

          <TextField
            label="Projects"
            name="projects"
            value={profileData.projects.join(", ")}
            onChange={(e) => handleArrayChange(e, "projects")}
            fullWidth
            margin="normal"
            color="primary"
          />

          <TextField
            label="Education"
            name="education"
            value={profileData.education.join(", ")}
            onChange={(e) => handleArrayChange(e, "education")}
            fullWidth
            margin="normal"
            color="primary"
          />

          <TextField
            label="Achievements and Certifications"
            name="achievementsAndCertifications"
            value={profileData.achievementsAndCertifications.join(", ")}
            onChange={(e) => handleArrayChange(e, "achievementsAndCertifications")}
            fullWidth
            margin="normal"
            color="primary"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", width: "100%", fontWeight: "bold" }}
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : "Submit"} {/* Show submitting text */}
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default ProfileForm;
