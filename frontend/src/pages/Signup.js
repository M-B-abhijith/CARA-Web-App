import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; 

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Handle sign-up form submission
  const handleSignUp = async () => {
    // Check if all fields are filled
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('Sign-up successful');
        navigate('/login');
      }
    } catch (error) {
      console.error('Sign-up failed', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      setOpen(true);
    }
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpen(false);
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

      {/* Snackbar for error message */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
}

export default SignUp;