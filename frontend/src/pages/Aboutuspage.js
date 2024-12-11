import React from 'react';
import './Aboutuspage.css';

const Aboutuspage = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About Us</h1>
                <p>
                    Welcome to <span className="highlight">CARA</span> – your personalized career recommendation assistant!
                </p>
                <p>
                    At <span className="highlight">CARA</span>, we understand the challenges of choosing the right career path 
                    in today’s fast-paced world. Our mission is to empower individuals, especially students and recent graduates, 
                    with the knowledge and tools needed to make informed decisions about their future.
                </p>
                <p>
                    With <span className="highlight">CARA</span>, you can explore career opportunities tailored to your unique 
                    aptitude, personality traits, values, and work preferences. By providing insights into your strengths and aligning 
                    them with potential professions, we aim to simplify the career decision-making process and help you achieve long-term 
                    success and satisfaction.
                </p>
                <p>
                    Whether you're at the crossroads of your education or looking for a fresh start, <span className="highlight">CARA</span> 
                     is here to guide you every step of the way. Together, let's unlock your potential and pave the way to a fulfilling career.
                </p>
            </div>
        </div>
    );
};

export default Aboutuspage;
