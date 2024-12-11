import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate(); // Use navigate hook

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppBar position="static" style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        {/* Hamburger Icon for Mobile */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            style={styles.hamburger}
          >
            <MenuIcon sx={{ fontSize: '35px' }} /> {/* Increase size of hamburger icon */}
          </IconButton>
        )}

        {/* Logo */}
        <Typography variant="h6" component="div" style={styles.logo} >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>CARA</Link>
        </Typography>

        {/* Centered Navigation Links */}
        {!isMobile && (
          <Box style={styles.navLinks}>
            <Link
              to="/Aboutuspage"
              style={styles.navLink}
            >
              About Us
            </Link>
            <Link
              to="/Contactuspage"
              style={styles.navLink}
            >
              Contact Us
            </Link>
            <Link
              to="/Privacypolicypage"
              style={styles.navLink}
            >
              Privacy Policy
            </Link>
            <Link
              to="/Termspage"
              style={styles.navLink}
            >
              Terms and Conditions
            </Link>
          </Box>
        )}

        {/* Dropdown menu for mobile */}
        {isMobile && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            style={styles.menu}
          >
            <MenuItem onClick={() => handleMenuClose()}><Link to="/Aboutuspage" style={{ textDecoration: 'none', color: 'inherit' }}>About us</Link></MenuItem>
            <MenuItem onClick={() => handleMenuClose()}><Link to="/Contactuspage" style={{ textDecoration: 'none', color: 'inherit' }}>Contact us</Link></MenuItem>
            <MenuItem onClick={() => handleMenuClose()}><Link to="/Privacypolicypage" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy policy</Link></MenuItem>
            <MenuItem onClick={() => handleMenuClose()}><Link to="/Termspage" style={{ textDecoration: 'none', color: 'inherit' }}>Terms and conditions</Link></MenuItem>
          </Menu>
        )}

        {/* Empty space for desktop */}
        {!isMobile && <Box style={styles.emptySpace} />}
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  appBar: {
    backgroundColor: '#ffffff',
    color: '#333',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    margin: '0 18px',
  },
  logo: {
    fontFamily: '"Mali", cursive',
    fontWeight: 'bold',
    fontSize: '30px',
    flex: 1,
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  navLinks: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    whiteSpace: 'nowrap',
  },
  navLink: {
    fontFamily: '"Mali", cursive',
    textDecoration: 'none',
    fontSize: '16px',
    color: '#333', 
    padding: '8px 16px', 
    '&:hover': {
      backgroundColor: '#f1f1f1', 
      borderRadius: '4px', 
    }
  },
  emptySpace: {
    flex: 1,
  },
  hamburger: {
    marginRight: '-30px',
  },
  menu: {
    top: '10px',
  },
};

export default Navbar;
