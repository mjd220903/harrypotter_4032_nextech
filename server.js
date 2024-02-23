const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const recommendationData = JSON.parse(fs.readFileSync('recommendations.json', 'utf8'));

app.post('/api/recommendations', (req, res) => {
  const { applicationType , features} = req.body;

  const recommendations = recommendationData[applicationType][features];

  if (!recommendations) {
    return res.status(400).json({ error: 'Invalid application type' });
  }

  return res.json(recommendations);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
