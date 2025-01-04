import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check for the authToken on page load (including refresh)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem('authToken', 'some-jwt-token'); // You should save the token here
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
