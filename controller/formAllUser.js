const { Survey } = require('../models');

const getUserSurveys = async (req, res) => {
  try {
    const userId = req.params.id;

    // Survey 모델을 이용하여 해당 사용자가 생성한 템플릿을 조회합니다.
    const surveys = await Survey.findAll({
      where: { userId: userId },
      attributes: ['id', 'title', 'mainImageUrl', 'createdAt'],
    });

    // 해당 사용자가 생성한 템플릿의 총 개수를 조회합니다.
    const totalCount = await Survey.count({ where: { userId: userId } });

    // 결과를 반환합니다.
    res.json({ surveys, total_count: totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '에러 발생', error: error.message });
  }
};

module.exports = { getUserSurveys };
