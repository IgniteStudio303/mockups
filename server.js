const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Base route (health check)
app.get('/', (req, res) => {
  res.send('Server is live');
});

// Mockups route

      app.get('/check-key', (req, res) => {
  res.send(process.env.DYNAMIC_API_KEY ? 'KEY EXISTS' : 'NO KEY');
    });

    res.json(response.data);

  } catch (error) {
    console.error('API ERROR:', error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
