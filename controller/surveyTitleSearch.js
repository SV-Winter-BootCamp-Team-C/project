const { Op } = require('sequelize');
const { Survey, Question, Answer } = require('../models');

// 설문조사 참여 여부 확인 로직
async function checkSurveyParticipation(userId, surveyId) {
  const questionIds = await Question.findAll({
    attributes: ['id'],
    where: { surveyId: surveyId },
    raw: true,
  });

  const totalQuestions = await Question.count({
    where: { surveyId: surveyId },
  });

  const userAnswers = await Answer.count({
    where: {
      userId: userId,
      questionId: {
        [Op.in]: questionIds.map((q) => q.id),
      },
    },
    distinct: true,
    col: 'questionId',
  });

  return userAnswers === totalQuestions;
}

const searchSurveyByTitle = async (req, res) => {
  try {
    const { title, userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'userId가 필요합니다.' });
    }

    const surveys = await Survey.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      attributes: [
        'id',
        'title',
        'mainImageUrl',
        'createdAt',
        'updatedAt',
        'deadline',
      ],
    });

    if (surveys.length === 0) {
      return res.status(404).json({ message: '설문을 찾을 수 없습니다.' });
    }

    const surveysWithParticipation = await Promise.all(
      surveys.map(async (survey) => {
        const isAttend = await checkSurveyParticipation(userId, survey.id);
        return {
          ...survey.toJSON(),
          isAttend,
        };
      }),
    );

    res.status(200).json({ surveys: surveysWithParticipation });
  } catch (error) {
    res.status(500).json({ message: '설문 검색 오류', error: error.message });
  }
};

module.exports = { searchSurveyByTitle };
