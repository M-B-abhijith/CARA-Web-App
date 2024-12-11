import React from 'react';
import './Contactuspage.css';

const Contactuspage = () => {
    return (
        <div className="contact-container">
            <div className="contact-content">
                <h1>Contact Us</h1>
                <p>We’d love to hear from you! If you have any questions, feedback, or need assistance, feel free to reach out to us:</p>
                
                <div className="contact-details">
                    <h3>Email:</h3>
                    <p>support@cara.com</p>

                    <h3>Phone:</h3>
                    <p>+1-800-CARA-HELP</p>

                    <h3>Address:</h3>
                    <p>CARA HQ, 123 Career Lane, Future City, FC 56789</p>
                </div>

                <h2>Connect with Us on Social Media</h2>
                <div className="social-media">
                    <p><strong>Facebook:</strong> <a href="https://facebook.com/cara" target="_blank" rel="noopener noreferrer">facebook.com/cara</a></p>
                    <p><strong>Twitter:</strong> <a href="https://twitter.com/cara" target="_blank" rel="noopener noreferrer">twitter.com/cara</a></p>
                    <p><strong>Instagram:</strong> <a href="https://instagram.com/cara" target="_blank" rel="noopener noreferrer">instagram.com/cara</a></p>
                </div>

                <p>We’re here to help you find your path to success!</p>
            </div>
        </div>
    );
};

export default Contactuspage;
