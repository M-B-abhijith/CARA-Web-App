import React, { useState } from "react";
import "./Qnsec2.css";
import { Radio, RadioGroup, FormControlLabel, FormControl, Button } from "@mui/material";
import { questions } from '../constants/questionsData'; // Importing the questions data
import { useNavigate } from 'react-router-dom';

function QuestionnairSec2() {
  const navigate = useNavigate();
  // const [answers, setAnswers] = useState(
  //   questions.reduce((acc, question, index) => {
  //     acc[`question-${index}`] = ''; // Initialize each question's answer as an empty string
  //     return acc;
  //   }, {})
  // );

  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      const key = question.questionText.replace(/\s+/g, '_'); 
      acc[key] = '';
      return acc;
    }, {})
  );
  

  const [errorMessage, setErrorMessage] = useState('');

  // // Handle change in radio buttons
  // const handleRadioChange = (event, questionIndex) => {
  //   setAnswers({
  //     ...answers,
  //     [`question-${questionIndex}`]: event.target.value,
  //   });
  // };

  const handleRadioChange = (event, questionText) => {
    const key = questionText.replace(/\s+/g, '_');
    setAnswers({
      ...answers,
      [key]: event.target.value,
    });
  };
  

  // Handle submit button click
  const handleSubmit = () => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(answers).every((answer) => answer !== '');
    if (!allFieldsFilled) {
      setErrorMessage('Please answer all questions before submitting.');
      return;
    }

    // Save answers to localStorage
    localStorage.setItem('personalityAnswers', JSON.stringify(answers));

    console.log(localStorage.getItem('personalityAnswers'));


    // Navigate to the results page
    navigate('/resultspage');
  };

  return (
    <div className="q2-container">
      <div className="q2-card">
        <h2>Questionnaire Sec 2</h2>
        <h1>Personality Traits Questions</h1>

        {/* Map through the questions data */}
        {questions.map((question, index) => (
          <div className="q2-question-box" key={index}>
            <p className="q2-question-title">
              {index + 1}. {question.questionText}
            </p>
            <div className="radio-group-container">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={`question-${index}`}
                  name={`question-${index}`}
                  value={answers[`question-${index}`]}
                  // onChange={(event) => handleRadioChange(event, index)}
                  onChange={(event) => handleRadioChange(event, question.questionText)}

                >
                  {/* Map through the options for the current question */}
                  {question.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option}
                      control={
                        <Radio
                          sx={{
                            color: "purple",
                            "&.Mui-checked": {
                              color: "purple",
                            },
                          }}
                        />
                      }
                      label={option}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        width: "100%",
                        borderRadius: "4px",
                        padding: "10px",
                        marginBottom: "5px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        ))}

        {/* Display error message if not all questions are answered */}
        {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}

        <Button
          variant="contained"
          sx={{ textTransform: "none", marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default QuestionnairSec2;
