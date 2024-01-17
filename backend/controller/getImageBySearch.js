const axios = require('axios');

// Pexels API 키 설정
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// 이미지 검색 API 라우트
const getImageByAPI = async (req, res) => {
  try {
    const perPage = req.query.perPage || '5';
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${req.params.query}&per_page=${perPage}&locale=ko-KR`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      },
    );

    // 각 이미지에서 'src.original' 필드만 추출하여 새 배열 생성
    const imageUrl = response.data.photos.map((photo) => photo.src.original);

    // 필요한 데이터만 포함된 새로운 응답 객체 생성
    const modifiedResponse = {
      url: imageUrl,
    };
    res.json(modifiedResponse);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
module.exports = { getImageByAPI };
