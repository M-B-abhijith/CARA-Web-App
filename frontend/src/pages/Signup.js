import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import './Signup.css'; 

function SignUp() {
  return (
    <div>
    <div className="signupcontainer">
      <div className="signupcard">
        <h2 className="title">Sign up</h2>

        <input
          type="text"
          placeholder="Username"
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
        />

        <Button
          variant="contained"
          className="signUpButton"
          onClick={() => console.log("Sign up clicked")}
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
