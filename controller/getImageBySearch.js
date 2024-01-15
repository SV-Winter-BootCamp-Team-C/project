const axios = require('axios');

// Pexels API 키 설정
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// 이미지 검색 API 라우트
const getImageByAPI = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${req.params.query}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      },
    );

    // 각 이미지에서 'id'와 'src.original' 필드만 추출하여 새 배열 생성
    const photos = response.data.photos.map((photo) => ({
      id: photo.id,
      original: photo.src.original,
    }));

    // 필요한 데이터만 포함된 새로운 응답 객체 생성
    const modifiedResponse = {
      photos: photos,
    };

    res.json(modifiedResponse);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
module.exports = { getImageByAPI };
