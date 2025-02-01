import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Custom Theme with Violet Primary Color
const theme = createTheme({
  palette: {
    primary: {
      main: "#9400d3", // Custom violet color
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

const CareerForm = () => {
  const navigate = useNavigate();

  const [careerData, setCareerData] = useState({
    title: "",
    jobOverview: "",
    salary: {
      entryLevel: "",
      midLevel: "",
      seniorLevel: "",
    },
    responsibilities: [],
    techStack: {
      languages: [],
      frameworks: [],
      tools: [],
      databases: [],
      others: [],
    },
    education: {
      degree: "",
      certifications: [],
    },
    careerGrowth: [],
    prosAndCons: {
      pros: [],
      cons: [],
    },
    futureTrends: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle general input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCareerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle nested fields (salary, education, prosAndCons)
  const handleNestedChange = (e, category, field) => {
    setCareerData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: e.target.value,
      },
    }));
  };

  // Handle array-based fields (responsibilities, careerGrowth, futureTrends)
  const handleArrayChange = (e, category, subCategory = null) => {
    const valueArray = e.target.value.split(",").map((item) => item.trim());

    setCareerData((prevData) => {
      if (subCategory) {
        // Handling nested arrays inside objects (education.certifications, prosAndCons.pros, etc.)
        return {
          ...prevData,
          [category]: {
            ...prevData[category],
            [subCategory]: valueArray,
          },
        };
      } else {
        // Handling top-level arrays (careerGrowth, responsibilities, etc.)
        return {
          ...prevData,
          [category]: valueArray,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting Career Data:", careerData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/careers/careercreate",
        careerData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Career data submitted successfully!");
        navigate("/moreinfo"); // Navigate to career page
      }
    } catch (error) {
      console.error("Error submitting career data:", error);
      alert("There was an error submitting the career data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "0% 15%", textAlign: "center" }}>
        <form className="career-form" onSubmit={handleSubmit}>
          <h2 style={{ color: "#515151" }}>Add Career Information</h2>

          <TextField
            label="Career Title"
            name="title"
            value={careerData.title}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Career Overview"
            name="jobOverview"
            value={careerData.jobOverview}
            onChange={handleChange}
            required
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />

          {/* Salary Fields */}
          <TextField
            label="Entry-Level Salary"
            name="entryLevel"
            value={careerData.salary.entryLevel}
            onChange={(e) => handleNestedChange(e, "salary", "entryLevel")}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mid-Level Salary"
            name="midLevel"
            value={careerData.salary.midLevel}
            onChange={(e) => handleNestedChange(e, "salary", "midLevel")}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senior-Level Salary"
            name="seniorLevel"
            value={careerData.salary.seniorLevel}
            onChange={(e) => handleNestedChange(e, "salary", "seniorLevel")}
            required
            fullWidth
            margin="normal"
          />

          {/* Responsibilities */}
          <TextField
            label="Responsibilities (comma-separated)"
            name="responsibilities"
            value={careerData.responsibilities.join(", ")}
            onChange={(e) => handleArrayChange(e, "responsibilities")}
            fullWidth
            margin="normal"
          />

          {/* Tech Stack */}
          {["languages", "frameworks", "tools", "databases", "others"].map(
            (category) => (
              <TextField
                key={category}
                label={`Tech Stack - ${category}`}
                name={category}
                value={careerData.techStack[category].join(", ")}
                onChange={(e) => handleArrayChange(e, "techStack", category)}
                fullWidth
                margin="normal"
              />
            )
          )}

          {/* Education */}
          <TextField
            label="Degree"
            name="degree"
            value={careerData.education.degree}
            onChange={(e) => handleNestedChange(e, "education", "degree")}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Certifications (comma-separated)"
            name="certifications"
            value={careerData.education.certifications.join(", ")}
            onChange={(e) => handleArrayChange(e, "education", "certifications")}
            fullWidth
            margin="normal"
          />

          {/* Career Growth */}
          <TextField
            label="Career Growth (comma-separated)"
            name="careerGrowth"
            value={careerData.careerGrowth.join(", ")}
            onChange={(e) => handleArrayChange(e, "careerGrowth")}
            fullWidth
            margin="normal"
          />

          {/* Pros and Cons */}
          <TextField
            label="Pros (comma-separated)"
            name="pros"
            value={careerData.prosAndCons.pros.join(", ")}
            onChange={(e) => handleArrayChange(e, "prosAndCons", "pros")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cons (comma-separated)"
            name="cons"
            value={careerData.prosAndCons.cons.join(", ")}
            onChange={(e) => handleArrayChange(e, "prosAndCons", "cons")}
            fullWidth
            margin="normal"
          />

          {/* Future Trends */}
          <TextField
            label="Future Trends (comma-separated)"
            name="futureTrends"
            value={careerData.futureTrends.join(", ")}
            onChange={(e) => handleArrayChange(e, "futureTrends")}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", width: "100%", fontWeight: "bold" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default CareerForm;
