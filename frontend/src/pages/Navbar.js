import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

function Navbar() {
  const [anchorElMobile, setAnchorElMobile] = useState(null); // For mobile menu
  const [anchorElUser, setAnchorElUser] = useState(null); // For user profile menu
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { loggedIn, logout } = useAuth(); // Get login state and logout function from context
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location

  // Get isAdmin status from localStorage
  const isAdmin = localStorage.getItem("authToken")
    ? JSON.parse(atob(localStorage.getItem("authToken").split(".")[1])).isAdmin
    : false;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuOpenMobile = (event) => {
    setAnchorElMobile(event.currentTarget);
  };

  const handleMenuCloseMobile = () => {
    setAnchorElMobile(null);
  };

  const handleMenuOpenUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuCloseUser = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  // Define pages where the UserButton should not appear
  const noUserButtonPages = ["/", "/login", "/signup"];

  return (
    <AppBar position="static" style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        {/* Hamburger Icon for Mobile */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpenMobile}
            style={styles.hamburger}
          >
            <MenuIcon sx={{ fontSize: "35px" }} />
          </IconButton>
        )}

        {/* Logo */}
        <Typography variant="h6" component="div" style={styles.logo}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            CARA
          </Link>
        </Typography>

        {/* Centered Navigation Links (Visible only on Desktop) */}
        {!isMobile && (
          <Box style={styles.navLinks}>
            <Link to="/Aboutuspage" style={styles.navLink}>
              About Us
            </Link>
            <Link to="/Contactuspage" style={styles.navLink}>
              Contact Us
            </Link>
            <Link to="/Privacypolicypage" style={styles.navLink}>
              Privacy Policy
            </Link>
            <Link to="/Termspage" style={styles.navLink}>
              Terms and Conditions
            </Link>
          </Box>
        )}

        {/* Dropdown menu for mobile */}
        {isMobile && (
          <Menu
            anchorEl={anchorElMobile}
            open={Boolean(anchorElMobile)}
            onClose={handleMenuCloseMobile}
            style={styles.menu}
          >
            <MenuItem onClick={() => handleMenuCloseMobile()}>
              <Link
                to="/Aboutuspage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About us
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuCloseMobile()}>
              <Link
                to="/Contactuspage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact us
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuCloseMobile()}>
              <Link
                to="/Privacypolicypage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Privacy policy
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuCloseMobile()}>
              <Link
                to="/Termspage"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Terms and conditions
              </Link>
            </MenuItem>
          </Menu>
        )}

        {/* Empty space for desktop */}
        {!isMobile && <Box style={styles.emptySpace} />}

        {/* Conditionally render User Profile Button and Dropdown */}
        {!noUserButtonPages.includes(location.pathname) && loggedIn && (
          <Box style={styles.userProfile}>
            <IconButton onClick={handleMenuOpenUser} color="inherit">
              <Avatar style={styles.avatar} />
            </IconButton>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleMenuCloseUser}
              style={styles.menu}
            >
              <MenuItem
                onClick={() =>
                  navigate(isAdmin ? "/Dashboardpage" : "/choosingpage")
                }
              >
                Dashboard
              </MenuItem>
              {!isAdmin && (
                <MenuItem onClick={() => navigate("/profilepage")}>
                  Profile
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  appBar: {
    backgroundColor: "#ffffff",
    color: "#333",
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
    margin: "0 18px",
  },
  logo: {
    fontFamily: '"Mali", cursive',
    fontWeight: "bold",
    fontSize: "30px",
    flex: 1,
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  navLinks: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    whiteSpace: "nowrap",
  },
  navLink: {
    fontFamily: '"Mali", cursive',
    textDecoration: "none",
    fontSize: "16px",
    color: "#333",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#f1f1f1",
      borderRadius: "4px",
    },
  },
  emptySpace: {
    flex: 1,
  },
  hamburger: {
    marginRight: "-30px",
  },
  menu: {
    top: "10px",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "35px",
    height: "35px",
  },
};



export default Navbar;
