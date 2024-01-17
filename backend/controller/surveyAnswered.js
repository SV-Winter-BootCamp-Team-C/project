const { Survey, User, Answer, Question } = require('../models');
const { surveyTitleSearch } = require('./surveyTitleSearch');

const surveyAnswered = async (req, res) => {
  const userId = req.params.id;
  const { page, limit, title } = req.query;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }

    const offset = (page - 1) * limit;

    const answered = await Answer.findAll({
      where: { userId: userId },
      attributes: ['questionId'],
    });
    const questionIds = answered.map((answer) => answer.questionId);

    const surveyed = await Question.findAll({
      where: { id: questionIds },
      attributes: ['surveyId'],
    });
    const surveyIds = Array.from(
      new Set(surveyed.map((survey) => survey.surveyId)),
    );
    if (!surveyIds || surveyIds.length === 0) {
      // 유저는 있지만 설문조사 게시글이 없는 경우
      return res.status(204).json({
        message: '작성한 설문지가 없습니다.',
      });
    }

    if (!title) {
      const surveys = await Survey.findAll({
        where: { id: surveyIds },
        limit: limit, // 반환할 결과의 최대 수
        offset: offset,
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

      // 각 설문지에 대해 참여자 수 계산
      for (const survey of surveys) {
        const userCount = await Answer.count({
          distinct: true,
          col: 'userId',
          include: [
            {
              model: Question,
              where: { surveyId: survey.id },
            },
          ],
        });

        // attendCount 추가
        survey.dataValues.attendCount = userCount;
      }
      const total = await Survey.count({
        where: { id: surveyIds },
      });

      // 총 페이지 수 계산
      const totalPages = Math.ceil(total / limit);

      // surveys를 응답으로 보내기
      res.json({
        surveys: surveys.map((survey) => survey.dataValues),
        totalPages,
      });
    } else {
      const surveys = await Survey.findAll({
        where: {
          id: surveyIds,
        },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title'],
      });
      const surveyed = surveys.map((survey) => ({
        surveyId: survey.id,
        surveyTitle: survey.title,
      }));

      const searchList = { surveys: surveyed, title };
      const resultList = surveyTitleSearch(searchList);
      const len = resultList.surveys.length;
      const tp = Math.ceil(len / limit);

      if (len == 0) {
        return res.status(208).json({ message: '검색된 설문지가 없습니다.' });
      }

      const sortedList = [];
      for (let i = 0; i < len && i < limit; i++) {
        const survey = await Survey.findOne({
          where: { id: resultList.surveys[offset + i] },
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

        const answer = await Answer.findOne({
          where: { userId: userId },
          include: [
            {
              model: Question,
              where: { surveyId: survey.id },
            },
          ],
        });

        const userCount = await Answer.count({
          distinct: true,
          col: 'userId',
          include: [
            {
              model: Question,
              where: { surveyId: survey.id },
            },
          ],
        });

        sortedList.push({
          surveyId: survey.dataValues.id,
          title: survey.dataValues.title,
          open: survey.dataValues.open,
          mainImageUrl: survey.dataValues.mainImageUrl,
          createdAt: survey.dataValues.createdAt,
          updatedAt: survey.dataValues.updatedAt,
          deadline: survey.dataValues.deadline,
          isAttended: !!answer,
          attendCount: userCount,
        });
      }
      res.status(200).json({ sortedList, totalPages: tp });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '에러 발생',
    });
  }
};

module.exports = { surveyAnswered };
