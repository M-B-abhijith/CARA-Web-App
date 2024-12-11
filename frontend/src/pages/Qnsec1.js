import React from 'react';
import "./Qnsec1.css";
import { Button } from "@mui/material";

function Questionnairsec1() {
  return (
    <div className="questionnaire-container">
      

      <div className="questionnaire-card">
        <h2>Questionnaire sec 1</h2>
        <h3>Enter your academic marks out of 100</h3>

        <div className="input-group">
          <input type="text" placeholder="Compiler Design" />
          <input type="text" placeholder="Computer Networks" />
          <input type="text" placeholder="Operating Systems" />
          <input type="text" placeholder="Object Oriented Programming" />
          <input type="text" placeholder="Data Structures" />
        </div>

        <Button variant="contained"  sx={{ textTransform: 'none' }}>Next</Button>
      </div>
    </div>
  );
}

export default Questionnairsec1;
