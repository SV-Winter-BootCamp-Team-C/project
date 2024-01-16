const { Survey, User } = require('../models');

const surveyAnswered = async (req, res) => {
  const userId = req.params.id;
  const { page, limit } = req.query;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }

    const offset = (page - 1) * limit;

    const surveys = await Survey.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
      attributes: [
        'id',
        'title',
        'open',
        'mainImageUrl',
        'createdAt',
        'updatedAt',
        'deadline',
      ],
    });

    if (!surveys || surveys.length === 0) {
      // 유저는 있지만 설문조사 게시글이 없는 경우
      return res.status(204).json({
        message: '작성한 설문지가 없습니다.',
      });
    }

    const total = await Survey.count({ where: { userId } });
    const totalPages = Math.ceil(total / limit);

    const result = {
      surveys: surveys.map((survey) => ({
        id: survey.id,
        title: survey.title,
        open: survey.open,
        mainImageUrl: survey.mainImageUrl,
        createdAt: survey.createdAt,
        updatedAt: survey.updatedAt,
        deadline: survey.deadline,
      })),
      totalPages,
    };

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '에러 발생',
    });
  }
};

module.exports = { surveyAnswered };
