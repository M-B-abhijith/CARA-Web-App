import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import navigate for redirection
import axios from 'axios'; // Import axios for making API requests
import './Signup.css'; 

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Handle sign-up form submission
  const handleSignUp = async () => {
    try {
      // Replace with your backend signup API endpoint
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('Sign-up successful');
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error('Sign-up failed', error);
    }
  };

  return (
    <div>
      <div className="signupcontainer">
        <div className="signupcard">
          <h2 className="title">Sign up</h2>

          <input
            type="text"
            placeholder="Username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            className="signUpButton"
            onClick={handleSignUp}
          >
            Sign up
          </Button>

          <p className="footerText">
            Already have an account?{' '}
          </p>
          <Link to="/login" className="loginLink">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
