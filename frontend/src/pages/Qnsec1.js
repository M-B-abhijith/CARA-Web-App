import React, { useState } from 'react';
import "./Qnsec1.css";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Questionnairsec1() {
  const navigate = useNavigate();
  const [marks, setMarks] = useState({
    os: '',
    algo: '',
    prog: '',
    se: '',
    cn: '',
    es: '',
    ca: '',
    math: '',
    comm: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarks({
      ...marks,
      [name]: value
    });
  };

  const handleNextClick = () => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(marks).every((mark) => mark !== '');
    if (!allFieldsFilled) {
      setErrorMessage('Please fill in all fields before proceeding.');
      return;
    }

    const exceedsMaxValue = Object.values(marks).some((mark) => {
      return Number(mark) > 100 || Number(mark) < 0;
    });
    
    if (exceedsMaxValue) {
      setErrorMessage('Marks should be between 0 and 100.');
      return;
    }

    // Store the marks in localStorage
    localStorage.setItem('marks', JSON.stringify(marks));

    console.log(localStorage.getItem('marks'));


    // Navigate to the next section (qnsec2)
    navigate('/qnsec2');
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h2>Questionnaire sec 1</h2>
        <h3>Enter your academic marks out of 100</h3>

        <div className="input-group">
          <input
            type="text"
            name="os"
            value={marks.os}
            placeholder="Operating Systems"
            onChange={handleChange}
          />
          <input
            type="text"
            name="algo"
            value={marks.algo}
            placeholder="Algorithms"
            onChange={handleChange}
          />
          <input
            type="text"
            name="prog"
            value={marks.prog}
            placeholder="Programming Concepts"
            onChange={handleChange}
          />
          <input
            type="text"
            name="se"
            value={marks.se}
            placeholder="Software Engineering"
            onChange={handleChange}
          />
          <input
            type="text"
            name="cn"
            value={marks.cn}
            placeholder="Computer Networks"
            onChange={handleChange}
          />
          <input
            type="text"
            name="es"
            value={marks.es}
            placeholder="Electronic Subjects"
            onChange={handleChange}
          />
          <input
            type="text"
            name="ca"
            value={marks.ca}
            placeholder="Computer Architecture"
            onChange={handleChange}
          />
          <input
            type="text"
            name="math"
            value={marks.math}
            placeholder="Mathematics"
            onChange={handleChange}
          />
          <input
            type="text"
            name="comm"
            value={marks.comm}
            placeholder="Communication Skills"
            onChange={handleChange}
          />
        </div>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Questionnairsec1;
