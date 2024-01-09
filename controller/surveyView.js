const { Survey, Answer, Question } = require('../models');

const findAnsweredSurvey = async (req, res) => {
  try {
    const userId = req.params.id;

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
                'mainImageUrl',
                'createdAt',
                'updatedAt',
                'deadline',
              ],
            },
          ],
        },
      ],
    });

    if (!answers.length) {
      return res
        .status(404)
        .json({ message: 'No answered surveys found for this user' });
    }

    // 조회된 설문조사를 반환합니다.
    res.json({ surveys: answers.map((answer) => answer.Question.Survey) });
  } catch (error) {
    // 에러가 발생한 경우 에러 메시지를 반환합니다.
    res.status(500).json({ message: error.message });
  }
};

module.exports = { findAnsweredSurvey };
