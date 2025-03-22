import React from 'react';
import './Privacypolicypage.css';

const Privacypolicypage = () => {
    return (
        <div className="privacy-container">
            <div className="privacy-content">
                <h1>Privacy Policy</h1>
                <p>At CARA, your privacy is our priority. This Privacy Policy outlines how we collect, use, and safeguard your information.</p>

                <h2>What Information We Collect:</h2>
                <ul>
                    <li>Personal details like your name, email, and age.</li>
                    <li>Responses to our questionnaires, which help us tailor career recommendations.</li>
                    <li>Usage data from your interactions with our platform.</li>
                </ul>

                <h2>How We Use Your Information:</h2>
                <ul>
                    <li>To provide personalized career recommendations.</li>
                    <li>To improve our platform and enhance user experience.</li>
                    <li>To send updates, tips, and notifications related to CARA services.</li>
                </ul>

                <h2>Data Security:</h2>
                <p>We implement robust measures to protect your data against unauthorized access and breaches. However, no system can be 100% secure, so we encourage you to use strong passwords and keep your credentials private.</p>

                <h2>Your Choices:</h2>
                <p>You can request to access, modify, or delete your data at any time by contacting us at <a href="mailto:privacy@cara.com">privacy@cara.com</a>.</p>

                <p>By using CARA, you agree to this Privacy Policy. Any updates to this policy will be communicated to users.</p>
            </div>
        </div>
    );
};

export default Privacypolicypage;
