const { Survey, Answer, Question } = require('../models');

const findAllSurveys = async (req, res) => {
  try {
    // Request로부터 Parameter 값들 가져오기
    const userId = req.params.id;
    const pageLimit = req.query.limit;
    const pageOffset = (req.query.page - 1) * pageLimit;

    // limit, offset으로 각 페이지마다 보여질 survey를 가져와 array로 만들기
    const surveys = await Survey.findAll({
      where: { open: true },
      attributes: [
        'id',
        'title',
        'mainImageUrl',
        'createdAt',
        'updatedAt',
        'deadline',
      ],
      limit: pageLimit,
      offset: pageOffset,
    });

    if (!surveys.length) {
      return res.status(404).json({ message: 'No surveys found' });
    }

    const result = [];
    for (const survey of surveys) {
      const answer = await Answer.findOne({
        where: { userId: userId },
        include: [
          {
            model: Question,
            where: { surveyId: survey.id },
          },
        ],
      });

      const user_count = await Answer.count({
        distinct: true,
        col: 'userId',
        include: [
          {
            model: Question,
            where: { surveyId: survey.id },
          },
        ],
      });

      result.push({
        survey_id: survey.id,
        title: survey.title,
        main_image_url: survey.mainImageUrl,
        created_at: survey.createdAt,
        updated_at: survey.updatedAt,
        deadline: survey.deadline,
        is_attended: !!answer,
        attend_count: user_count,
      });
    }

    res.json({ surveys: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { findAllSurveys };
