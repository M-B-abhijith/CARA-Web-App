import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'; 
import './Login.css'; 

function Login() {
  return (
    <div>
    <div className="logincontainer">
      <div className="logincard">
        <h2 className="title">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
        />

        <Button
          variant="contained"
          className="loginButton"
          onClick={() => console.log("Login clicked")}
        >
          Login
        </Button>

        <p className="footerText">
          Don’t have an account?{' '}
        </p>
        <Link to="/signup" className="signUpLink">Sign up</Link>
      </div>
    </div>
    </div>
  );
}

export default Login;
