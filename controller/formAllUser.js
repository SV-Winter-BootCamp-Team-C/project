const { Survey, Answer, Question } = require('../models');

const getUserSurveys = async (req, res) => {
  try {
    const userId = req.params.id;
    const pageLimit = req.query.limit;
    const pageOffset = (req.query.page - 1) * pageLimit;

    const surveys = await Survey.findAll({
      where: { userId: userId },
      attributes: [
        'id',
        'title',
        'mainImageUrl',
        'createdAt',
        'deadline',
        'open',
      ],
      offset: pageOffset,
      limit: pageLimit,
    });

    // 각 설문조사에 대한 attended_count 계산
    const modifiedSurveys = await Promise.all(
      surveys.map(async (survey) => {
        const attendedCount = await Answer.count({
          distinct: true,
          col: 'userId',
          include: [
            {
              model: Question,
              attributes: [],
              where: { surveyId: survey.id },
            },
          ],
        });

        return {
          surveyId: survey.id,
          title: survey.title,
          open: survey.open, // 여기에 open 상태를 결정하는 로직 추가
          imageUrl: survey.mainImageUrl,
          createdAt: survey.createdAt,
          deadline: survey.deadline, // 여기에 마감일 결정 로직 추가
          attendedCount: attendedCount,
        };
      }),
    );

    const totalCount = await Survey.count({ where: { userId: userId } });

    res.json({
      surveys: modifiedSurveys,
      totalPages: Math.ceil(totalCount / pageLimit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '에러 발생', error: error.message });
  }
};

module.exports = { getUserSurveys };
