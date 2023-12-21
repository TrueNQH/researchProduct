const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

app.get('/searchbychatbot', async (req, res) => {

  const imageUrl = req.query.q; // Lấy giá trị từ query string
  if (!imageUrl) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing image URL in query parameter'
    });
  }

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_lens',
        
        url: imageUrl, // Sử dụng imageUrl từ query string ở đây
        api_key: '987b2c8dbc4a03a14efb06a16a9ec33256dc9ca456d0223235b5fad859a1af36'
      }
    });
    const filteredPrices = response.data.visual_matches.filter(item => item.hasOwnProperty("price"));
    const transformedData = filteredPrices.map((item, index) => ({
      [`title${index + 1}`]: item.title,
      [`link${index + 1}`]: item.link,
      [`price${index + 1}`]: item.price.value,
      [`thumbnail${index + 1}`]: item.thumbnail,
    }));
    
    // Gom tất cả thông tin vào một đối tượng duy nhất
    const finalData = transformedData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    
    res.json(finalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message // Lấy message từ error
    });
  }
});

app.get('/search', async (req, res) => {
  const imageUrl = req.query.q; // Lấy giá trị từ query string
  if (!imageUrl) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing image URL in query parameter'
    });
  }

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_lens',
        
        url: imageUrl, // Sử dụng imageUrl từ query string ở đây
        api_key: '987b2c8dbc4a03a14efb06a16a9ec33256dc9ca456d0223235b5fad859a1af36'
      }
    });
    const filteredPrices = response.data.visual_matches.filter(item => item.hasOwnProperty("price"));

    
    res.json(filteredPrices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message // Lấy message từ error
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
