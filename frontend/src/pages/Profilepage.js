import React from 'react';
import './Profilepage.css';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import profilepicsample from '../assets/profilepicsample.png';


const ProfilePage = () => {
    const handleDownloadPDF = () => {
        const profileDetails = document.querySelector('.profile-details');
        const downloadButton = document.querySelector('.download-button-container');

        // Hide the download button
        downloadButton.style.display = 'none';

        // Use html2canvas to capture the content as an image
        html2canvas(profileDetails, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new jsPDF instance
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add the captured image to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Save the PDF with a specific filename
            pdf.save('ProfilePage.pdf');

            // Show the download button again
            downloadButton.style.display = 'flex';
        });
    };

    return (
        <div className="profile-container">
            <div className="profile-summary">
                <div className="profile-details">
                    <div className="profile-card">
                        <div class="profile-image-container">
                            <img className="profile-image" src={profilepicsample} alt="User" />
                        </div>
                        <div className="profileheaderdetails">
                            <h2>M B Abhijith Nair</h2>
                            <div className="anotherdiv2">
                                <p style={{ fontWeight: '600' }}>BTech CSE Student @ RIT Kottayam</p>
                                <div className="anotherdiv">
                                    <p>mbabhijithnair090@gmail.com</p>
                                    <p style={{ marginLeft: '15px' }}>8848409436</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr style={{}} />

                    <h3>Profile Summary</h3>
                    <p>
                        A web developer is responsible for building and maintaining websites and web applications.
                        They work on both the front end (client side) and back end (server side) of web development,
                        ensuring functionality, performance, and an engaging user experience.
                    </p>

                    <h3 className="skillheading">Skills</h3>
                    <div className="skills-section">
                        <div>
                            <h4>Languages:</h4>
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JS</span>
                        </div>
                        <div>
                            <h4>Frameworks:</h4>
                            <span>React</span>
                            <span>Angular</span>
                            <span>Vue</span>
                            <span>Node</span>
                            <span>Express</span>
                        </div>
                        <div>
                            <h4>Tools:</h4>
                            <span>Git</span>
                            <span>Webpack</span>
                            <span>Babel</span>
                        </div>
                        <div>
                            <h4>Databases:</h4>
                            <span>MySQL</span>
                            <span>MongoDB</span>
                        </div>
                        <div>
                            <h4>Other:</h4>
                            <span>APIs</span>
                            <span>RESTful Services</span>
                            <span>GraphQL</span>
                            <span>Docker</span>
                        </div>
                    </div>

                    <h3>Projects</h3>
                    <ul>
                        <li>Progressive Web Apps (PWA): Offering mobile-like experiences on the web.</li>
                        <li>WebAssembly: Faster execution of code in web browsers.</li>
                        <li>AI in Web Development: Integration of AI to personalize user experience.</li>
                        <li>
                            No-Code/Low-Code Platforms: Allowing non-developers to create websites, reducing the demand
                            for basic web development.
                        </li>
                    </ul>

                    <h3>Education</h3>
                    <ul>
                        <li>BTech in Computer Science and Engineering</li>
                        <li>Masters in Computer Science and Engineering</li>
                    </ul>

                    <h3>Achievements and Certification</h3>
                    <ul>
                        <li>Certified in AI and Web Development</li>
                        <li>Certification in Full-Stack Development</li>
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
