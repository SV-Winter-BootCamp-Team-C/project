const { Survey, Answer, Question } = require('../models');

const findAllSurveys = async (req, res) => {
  try {
    const userId = req.params.id;
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

      const attend_count = await Answer.count({
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
        attend_count: attend_count,
      });
    }

    res.json({ surveys: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { findAllSurveys };
