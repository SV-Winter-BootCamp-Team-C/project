const { pg } = require('../models/database');

const getUserSurveys = async (req, res) => {
  try {
    const userId = req.params.id;

  
    const queryResult = await pg.query(
      'SELECT id, title, main_image_url, created_at FROM "Survey" WHERE user_id = $1', 
      [userId],
    );
    const surveys = queryResult.rows;

    const countResult = await pg.query('SELECT COUNT(*) FROM "Survey" WHERE user_id = $1', [userId]);
    const totalCount = countResult.rows[0].count;

    // 결과 반환
    res.json({ surveys: surveys, total_count: totalCount });
  } catch (error) {
    res.status(500).json({ message: '에러 발생', error: error.message });
  }
};

module.exports = { getUserSurveys };
