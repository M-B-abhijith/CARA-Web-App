import React from "react";
import Button from "@mui/material/Button";
import ProfileIcon from "../assets/profilesetup.svg"; // Path to your SVG file
import { useNavigate } from "react-router-dom";

const SetupProfilePrompt = () => {


    const navigate = useNavigate(); // Initialize navigate

    const handleClick = () => {
        // Navigate to the Profile Form page when button is clicked
        navigate("/ProfileForm"); // Replace "/profile-form" with your desired path
      };

  return (
    <div
      className="setup-profile-prompt"
      style={{
        padding: "5%",
        background: "#f7f7f7",
        textAlign: "center",
        height: "5%",
        width: "70%",
        marginTop: "8%",
        margin: "auto",
        borderRadius: "8px",
      }}
    >
      {/* Import SVG as an image */}
      <img
        src={ProfileIcon}
        alt="Profile Icon"
        style={{ width: "350px" }}
      />

      <p style={{ fontSize: "20px", color: "grey" }}>
        It seems you haven't set up your profile yet.
      </p>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "darkviolet",
          "&:hover": { backgroundColor: "darkviolet", cursor: "pointer" },
        }}
        onClick={handleClick}
      >
        Build Your Profile
      </Button>
    </div>
  );
};

export default SetupProfilePrompt;
