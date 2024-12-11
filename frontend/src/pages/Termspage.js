import React from 'react';
import './Termspage.css';

const Termspage = () => {
    return (
        <div className="terms-container">
            <div className="terms-content">
                <h1>Terms and Conditions</h1>
                <p>Welcome to CARA! By accessing and using our platform, you agree to the following terms and conditions:</p>

                <h2>1. Use of the Platform</h2>
                <ul>
                    <li>CARA is designed to provide career recommendations based on user inputs.</li>
                    <li>Users must be 13 years or older to use the platform.</li>
                </ul>

                <h2>2. Accuracy of Information</h2>
                <ul>
                    <li>While CARA strives to provide accurate and personalized recommendations, the final decision rests with the user.</li>
                    <li>CARA does not guarantee job placement or career success.</li>
                </ul>

                <h2>3. User Responsibilities</h2>
                <ul>
                    <li>Users must provide accurate information to receive the best recommendations.</li>
                    <li>Users are responsible for safeguarding their login credentials.</li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <ul>
                    <li>All content on the CARA platform, including its design, software, and recommendations, is the intellectual property of CARA.</li>
                    <li>Unauthorized reproduction or distribution is prohibited.</li>
                </ul>

                <h2>5. Limitation of Liability</h2>
                <ul>
                    <li>CARA is not liable for any decisions or outcomes resulting from its recommendations.</li>
                    <li>Users are encouraged to seek additional career counseling or advice as needed.</li>
                </ul>

                <h2>6. Changes to Terms</h2>
                <p>CARA reserves the right to modify these terms at any time. Users will be notified of significant changes.</p>

                <p>By using CARA, you acknowledge and agree to these terms. If you have any questions, please contact us at <a href="mailto:legal@cara.com">legal@cara.com</a>.</p>
            </div>
        </div>
    );
};

export default Termspage;
