import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Joblisting.css";
import { Button, CircularProgress } from "@mui/material";

function JobScrape() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/jobscrape/live");
                setJobs(response.data.jobs);
            } catch (err) {
                setError("Failed to fetch jobs. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="job-listings-container">
            <div className="job-listings-card">
                <h2>Latest Job Opportunities</h2>

                {loading && <CircularProgress />}
                {error && <p className="error">{error}</p>}

                {!loading && !error && jobs.length === 0 && <p>No jobs found here.</p>}

                {jobs.map((job, index) => (
                    <div className="job-item" key={index}>
                        <div className="outerbox">
                            <div className="job-logo">
                                <img src={job.logo} alt={`${job.company} logo`} />
                                <h3>{job.company}</h3>
                            </div>
                            <div className="job-details">
                                <p className="job-title">{job.title}</p>
                                <p className="job-loc">{job.location}</p>
                                <p className="job-sal">{job.salary}</p>
                            </div>
                        </div>

                        <div className="job-actions">
                            <Button
                                variant="contained"
                                sx={{ textTransform: "none" }}
                                onClick={() => window.open(job.applyLink, "_blank")}
                            >
                                Apply Now
                            </Button>
                            <p className="job-posted">{job.posted}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobScrape;
