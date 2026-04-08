const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Server is live');
});

app.get('/mockups', async (req, res) => {
  try {
    const response = await axios.get('https://app.dynamicmockups.com/api/v1/mockups', {
      headers: {
        'x-api-key': process.env.DYNAMIC_API_KEY,
        'Accept': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch mockups' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Running on port ' + PORT));
