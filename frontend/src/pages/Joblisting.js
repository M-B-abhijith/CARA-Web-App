import React from "react";
import "./Joblisting.css";
import { Button } from "@mui/material";

function JobListings() {
    const jobs = [
        {
            id: 1,
            company: "Aristocrat",
            title: "Junior web developer",
            location: "Noida",
            salary: "$33000",
            posted: "3 days ago",
            logo: "https://via.placeholder.com/50", 
        },
        {
            id: 2,
            company: "Google",
            title: "Full Stack Developer",
            location: "Chennai",
            salary: "$55000",
            posted: "5 days ago",
            logo: "https://via.placeholder.com/50", 
        },
        {
            id: 3,
            company: "IBM",
            title: "Senior Web Developer",
            location: "Kochi",
            salary: "$55000",
            posted: "5 days ago",
            logo: "https://via.placeholder.com/50", 
        },
    ];

    return (
        <div className="job-listings-container">
            <div className="job-listings-card">
                <h2>Your job opportunities are</h2>

                {jobs.map((job) => (
                    <div className="job-item" key={job.id}>
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
                            <Button variant="contained" sx={{ textTransform: "none" }}>
                                Apply
                            </Button>
                            <p className="job-posted">{job.posted}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobListings;
