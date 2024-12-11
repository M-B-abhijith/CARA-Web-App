const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/predict', (req, res) => {
  const { data } = req.body;

  // Placeholder for ML integration
  const prediction = `Prediction for "${data}"`;
  res.json({ prediction });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
