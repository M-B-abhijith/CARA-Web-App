import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Joblisting.css";
import { Button, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

function JobScrape() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Get careerTitle from navigation state, default to "Application Developer" if not provided
    const careerTitle = location.state?.careerTitle || "Application Developer";

    // Function to parse "days ago" strings into a number of days
    const parseDaysAgo = (dateString) => {
        if (!dateString) return Infinity; // Fallback for missing dates
        const lowerDate = dateString.toLowerCase().trim();
        if (lowerDate === "posted today" || lowerDate === "today") return 0;
        const match = lowerDate.match(/(\d+)\s*days?\s*ago/);
        return match ? parseInt(match[1], 10) : Infinity; // Use Infinity for unparseable dates
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/jobscrape/timesjobs-jobs", {
                    params: { q: careerTitle },
                });
                console.log("API Response:", response.data);

                // Sort jobs by recency
                const sortedJobs = (response.data.jobs || []).sort((a, b) => {
                    const daysAgoA = parseDaysAgo(a.date);
                    const daysAgoB = parseDaysAgo(b.date);
                    return daysAgoA - daysAgoB; // Ascending order (most recent first)
                });

                setJobs(sortedJobs);
            } catch (err) {
                setError("Failed to fetch jobs. Please try again later.");
                console.error("Fetch error:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [careerTitle]); // Re-run when careerTitle changes

    return (
        <div className="job-listings-container">
            <div className="job-listings-card">
                <h2>{`${careerTitle} Jobs`}</h2>

                {loading && <CircularProgress />}
                {error && <p className="error">{error}</p>}

                {!loading && !error && jobs.length === 0 && <p>No jobs found.</p>}

                {jobs.map((job, index) => (
                    <div className="job-item" key={index}>
                        <div className="outerbox">
                            <div className="job-details">
                                <p className="job-title">{job.title}</p>
                                <p>{job.company}</p>
                                <p className="job-loc">{job.location}</p>
                                {job.salary && <p className="job-sal">{job.salary}</p>}
                                {job.experience && <p className="job-exp">{job.experience}</p>}
                            </div>
                        </div>
                        <div className="job-actions">
                            <Button
                                variant="contained"
                                sx={{ textTransform: "none" }}
                                onClick={() => window.open(job.link, "_blank")}
                            >
                                Apply Now
                            </Button>
                            <p className="job-posted">{job.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobScrape;