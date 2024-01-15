// 필요한 모듈 임포트
const express = require('express');
const axios = require('axios');

// Express 및 Multer 설정
const app = express();

// Pexels API 키 설정
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// 이미지 검색 API 라우트
app.get('/search/:query', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${req.params.query}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      },
    );
    const responseImageURL = response.data.querySelector('page');

    console.log(responseImageURL);

    res.json(responseImageURL);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
