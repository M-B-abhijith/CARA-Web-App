import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9400d3",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

const JobFormPage = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    company: { name: "", logo: "" },
    title: "",
    location: "",
    salary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [category]: { ...prevData[category], [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/jobpost/jobpostcreate", jobData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      if (response.status === 201) {
        alert("Job posted successfully!");
        navigate("/Joblisting");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "0% 15%", textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "#515151" }}>Post a Job</h2>
          <TextField label="Company Name" name="name" value={jobData.company.name} onChange={(e) => handleNestedChange(e, "company")} required fullWidth margin="normal" />
          <TextField label="Company Logo URL" name="logo" value={jobData.company.logo} onChange={(e) => handleNestedChange(e, "company")} required fullWidth margin="normal" />
          <TextField label="Job Title" name="title" value={jobData.title} onChange={handleChange} required fullWidth margin="normal" />
          <TextField label="Location" name="location" value={jobData.location} onChange={handleChange} required fullWidth margin="normal" />
          <TextField label="Salary" name="salary" value={jobData.salary} onChange={handleChange} required fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px", width: "100%", fontWeight: "bold" }} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default JobFormPage;