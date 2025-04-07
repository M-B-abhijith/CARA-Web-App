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

    const careerTitle = location.state?.careerTitle || "Application Developer";

    // Function to parse "days ago" or "hours ago" strings into a comparable value
    const parseDaysAgo = (dateString) => {
        if (!dateString) return Infinity; // Fallback for missing dates
        const lowerDate = dateString.toLowerCase().trim();

        // Handle "posted today", "today", or "24h" cases (within 24 hours)
        if (lowerDate === "posted today" || lowerDate === "today" || lowerDate === "24h") return 0;

        // Handle "X hours ago" 
        const hoursMatch = lowerDate.match(/(\d+)\s*h(?:ours?)?\s*ago/);
        if (hoursMatch) {
            const hours = parseInt(hoursMatch[1], 10);
            return hours <= 24 ? 0 : hours / 24; // Treat <= 24h as "today" (0), else convert to days
        }

        // Handle "X days ago"
        const daysMatch = lowerDate.match(/(\d+)\s*days?\s*ago/);
        return daysMatch ? parseInt(daysMatch[1], 10) : Infinity; // Use Infinity for unparseable dates
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/jobscrape/timesjobs-jobs", {
                    params: { q: careerTitle },
                });
                console.log("API Response:", response.data);

                // Sort jobs: "24h" or "today" first, then by days ago
                const sortedJobs = (response.data.jobs || []).sort((a, b) => {
                    const daysAgoA = parseDaysAgo(a.date);
                    const daysAgoB = parseDaysAgo(b.date);

                    // If both are within 24h (0), keep original order or sort by title if desired
                    if (daysAgoA === 0 && daysAgoB === 0) return 0;

                    // Prioritize "0" (within 24h) over anything else
                    if (daysAgoA === 0) return -1;
                    if (daysAgoB === 0) return 1;

                    // Otherwise, sort by days ago in ascending order
                    return daysAgoA - daysAgoB;
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
    }, [careerTitle]); 

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