import React from "react";
import "./Qnsec2.css";
import { Radio, RadioGroup, FormControlLabel, FormControl, Button } from "@mui/material";

function QuestionnairSec2() {
  return (
    <div className="q2-container">
      <div className="q2-card">
        <h2>Questionnaire Sec 2</h2>
        <h1>Personality Traits Questions</h1>

        {/* Questions */}
        {[1, 2, 3, 4].map((questionNumber) => (
          <div className="q2-question-box" key={questionNumber}>
            <p className="q2-question-title">
              {questionNumber}. How much friendly are you?
            </p>
            <div className="radio-group-container">

              <FormControl component="fieldset">
                <RadioGroup aria-label={`question-${questionNumber}`} name={`question-${questionNumber}`}>
                  <FormControlLabel value="Not at all" control={<Radio sx={{
                    color: "purple", // Unchecked color
                    "&.Mui-checked": {
                      color: "purple", // Checked color
                    },
                  }} />} label="Not at all" sx={{
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "5px",
                    color: "white",
                    fontWeight: "bold",
                  }} />
                  <FormControlLabel value="Somewhat" control={<Radio sx={{
                    color: "purple", // Unchecked color
                    "&.Mui-checked": {
                      color: "purple", // Checked color
                    },
                  }} />} label="Somewhat" sx={{
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "5px",
                    color: "white",
                    fontWeight: "bold",
                  }} />
                  <FormControlLabel value="Friendly" control={<Radio sx={{
                    color: "purple", // Unchecked color
                    "&.Mui-checked": {
                      color: "purple", // Checked color
                    },
                  }} />} label="Friendly" sx={{
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "5px",
                    color: "white",
                    fontWeight: "bold",
                  }} />
                  <FormControlLabel value="Very Friendly" control={<Radio sx={{
                    color: "purple", // Unchecked color
                    "&.Mui-checked": {
                      color: "purple", // Checked color
                    },
                  }} />} label="Very Friendly" sx={{
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "5px",
                    color: "white",
                    fontWeight: "bold",
                  }} />
                </RadioGroup>
              </FormControl>
            </div>

          </div>
        ))}

        <Button
          variant="contained"
          sx={{ textTransform: "none", marginTop: "20px" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default QuestionnairSec2;
