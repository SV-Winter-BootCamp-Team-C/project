const { Survey, Answer, Question } = require('../models');

const surveyAnswered = async (req, res) => {
  try {
    const userId = req.params.id;

    const totalSurveys = await Survey.count({
      where: { open: true },
    });

    const pageLimit = req.query.limit;
    const pageOffset = (req.query.page - 1) * pageLimit;

    const totalPages = Math.ceil(totalSurveys / pageLimit);

    // 해당 사용자가 답변한 설문조사를 찾습니다.
    const answers = await Answer.findAll({
      where: { userId },
      include: [
        {
          model: Question,
          include: [
            {
              model: Survey,
              attributes: [
                'id',
                'title',
                'open',
                'mainImageUrl',
                'createdAt',
                'updatedAt',
                'deadline',
              ],
            },
          ],
        },
      ],
      limit: pageLimit,
      offset: pageOffset,
    });

    if (!answers.length) {
      return res
        .status(404)
        .json({ message: 'No answered surveys found for this user' });
    }

    // 조회된 설문조사를 반환합니다.
    res.json({
      surveys: answers.map((answer) => answer.Question.Survey),
      totalPages: totalPages,
    });
  } catch (error) {
    // 에러가 발생한 경우 에러 메시지를 반환합니다.
    res.status(500).json({ message: error.message });
  }
};

module.exports = { surveyAnswered };
