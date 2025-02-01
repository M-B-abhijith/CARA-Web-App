import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for routing
import axios from 'axios'; // Import axios to make HTTP requests
import { Button, Snackbar } from '@mui/material'; // Snackbar for displaying error message
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error message
  const [open, setOpen] = useState(false); // State to open/close the Snackbar

  const navigate = useNavigate();

  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', { username, password });
  
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
  
        // Navigate based on role
        if (response.data.isAdmin) {
          navigate('/Dashboardpage'); // Redirect admin to the dashboard
        } else {
          navigate('/choosingpage'); // Redirect normal users to choosing page
        }
      }
    } catch (error) {
      console.error('Login failed', error);
  
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      setOpen(true); // Open the Snackbar with the error message
    }
  };
  

  // Close the Snackbar after 4 seconds
  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="logincontainer">
        <div className="logincard">
          <h2 className="title">Login</h2>

          <input
            type="text"
            placeholder="Username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            className="loginButton"
            onClick={handleLogin}
          >
            Login
          </Button>

          <p className="footerText">
            Don’t have an account?{' '}
          </p>
          <Link to="/signup" className="signUpLink">Sign up</Link>
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

export default Login;
