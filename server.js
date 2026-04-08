const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Base route (health check)
app.get('/', (req, res) => {
  res.send('Server is live');
});

// Mockups route

app.get('/render', async (req, res) => {
  try {
    const response = await axios.post(
      'https://app.dynamicmockups.com/api/v1/renders',
      {
        mockup_uuid: "f0d59740-e127-4086-b122-847de1b0e389",
        smart_objects: [
          {
            uuid: "bdb4f385-9648-4a65-8214-48c5eb07c733",
            asset: {
              type: "image",
              url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg"
            }
          }
        ]
      },
      {
        headers: {
          'x-api-key': process.env.DYNAMIC_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error('RENDER ERROR:', error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});
