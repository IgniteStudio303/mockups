const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Base route (health check)
app.get('/', (req, res) => {
  res.send('Server is live');
});

// Mockups route

app.get('/mockups', async (req, res) => {
  try {
    const response = await axios.get('https://app.dynamicmockups.com/api/v1/mockups', {
      headers: {
        'x-api-key': process.env.DYNAMIC_API_KEY,
        'Accept': 'application/json'
      }
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(response.data);

  } catch (error) {
    console.error('API ERROR:', error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});
