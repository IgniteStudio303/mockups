const express = require('express');
const axios = require('axios');

const app = express();

// Base route
app.get('/', (req, res) => {
  res.send('Server is live');
});

// Render route
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
  url: "https://cdn.shopify.com/s/files/1/0791/2226/8388/files/6a8b68dd-62c5-481d-9fc1-82d82f55e55e_34d5dcec-dd40-49df-8f6d-162a93a13c5f.webp?v=1775602710"
}
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
