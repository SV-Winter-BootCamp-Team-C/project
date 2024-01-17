const { Survey, Answer, Question } = require('../models');
const { surveyTitleSearch } = require('./surveyTitleSearch');

const showAllSurveys = async (req, res) => {
  try {
    // Request로부터 Parameter 값들 가져오기
    const userId = req.params.id;
    const pageLimit = req.query.limit;
    const pageOffset = (req.query.page - 1) * pageLimit;
    const title = req.query.title;

    if (!title) {
      const totalSurveys = await Survey.count({
        where: { open: true },
      });

      const totalPages = Math.ceil(totalSurveys / pageLimit);

      const surveys = await Survey.findAll({
        where: { open: true },
        attributes: [
          'id',
          'title',
          'open',
          'mainImageUrl',
          'createdAt',
          'updatedAt',
          'deadline',
        ],
        limit: pageLimit,
        offset: pageOffset,
      });

      if (!surveys.length) {
        return res.status(204).json({ message: '작성된 설문지가 없습니다.' });
      }

      const preResult = [];
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

        preResult.push({
          surveyId: survey.id,
          title: survey.title,
          open: survey.open,
          mainImageUrl: survey.mainImageUrl,
          createdAt: survey.createdAt,
          updatedAt: survey.updatedAt,
          deadline: survey.deadline,
          isAttended: !!answer,
          attendCount: userCount,
        });
      }
      res.status(200).json({ surveys: preResult, totalPages: totalPages });
    } else {
      const selectSurveys = await Survey.findAll({
        where: { open: true },
        attributes: ['id', 'title'],
      });

      if (!selectSurveys.length) {
        return res.status(204).json({ message: '작성된 설문지가 없습니다.' });
      }

      const titleList = [];
      for (const survey of selectSurveys) {
        titleList.push({
          surveyId: survey.id,
          surveyTitle: survey.title,
        });
      }
      const searchList = { surveys: titleList, title: title };
      const resultList = surveyTitleSearch(searchList);
      const len = resultList.surveys.length;
      const tp = Math.ceil(len / pageLimit);

      if (len == 0) {
        return res.status(208).json({ message: '검색된 설문지가 없습니다.' });
      }

      const sortedList = [];
      for (let i = 0; i < len && i < pageLimit; i++) {
        const survey = await Survey.findOne({
          where: { id: resultList.surveys[pageOffset + i] },
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '데이터를 불러오는데 실패했습니다.' });
  }
};

module.exports = { showAllSurveys };
