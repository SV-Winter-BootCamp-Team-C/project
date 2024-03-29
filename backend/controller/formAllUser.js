const { Survey, Answer, Question } = require('../models');
const { surveyTitleSearch } = require('./surveyTitleSearch');

const getUserSurveys = async (req, res) => {
  try {
    const userId = req.params.id;
    const pageLimit = req.query.limit;
    const page = req.query.page;
    const startIndex = (page - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;
    const title = req.query.title;

    if (!title) {
      const preResult = [];
      const surveys = await Survey.findAll({
        where: { userId: userId },
        attributes: [
          'id',
          'title',
          'mainImageUrl', // Make sure to include 'mainImageUrl' here
          'createdAt',
          'deadline',
          'open',
        ],
      });

      // 각 설문조사에 대한 attended_count 계산
      for (const survey of surveys) {
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

        preResult.push({
          surveyId: survey.id,
          title: survey.title,
          open: survey.open,
          mainImageUrl: survey.mainImageUrl || null,
          createdAt: survey.createdAt,
          updatedAt: survey.updatedAt,
          deadline: survey.deadline,
          attendCount: attendedCount,
        });
      }

      if ('attendCount' in req.query) {
        preResult.sort((a, b) => b.attendCount - a.attendCount);
      } else if ('deadline' in req.query) {
        preResult.sort((a, b) => a.deadline - b.deadline);
      } else {
        preResult.sort((a, b) => b.createdAt - a.createdAt); // 아무 것도 없다면 만들어진 날짜로 내림차순을 디폴트로
      }

      const totalCount = await Survey.count({ where: { userId: userId } });
      const totalPages = Math.ceil(totalCount / pageLimit);
      const currentPageData = preResult.slice(startIndex, endIndex);

      res
        .status(200)
        .json({ surveys: currentPageData, totalPages: totalPages });
    } else {
      const selectSurveys = await Survey.findAll({
        where: { userId: userId },
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
      for (let i = 0; i < len; i++) {
        const survey = await Survey.findOne({
          where: { id: resultList.surveys[i] },
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

      // 정렬된 결과와 전체 페이지 수를 반환합니다.
      if ('attendCount' in req.query) {
        sortedList.sort((a, b) => b.attendCount - a.attendCount);
      } else if ('deadline' in req.query) {
        sortedList.sort((a, b) => a.deadline - b.deadline);
      } else {
        sortedList.sort((a, b) => b.createdAt - a.createdAt);
      }

      const startIndex = (page - 1) * pageLimit;
      const endIndex = startIndex + pageLimit;
      const pagedSortedList = sortedList.slice(startIndex, endIndex);

      res.status(200).json({ sortedList: pagedSortedList, totalPages: tp });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '에러 발생', error: error.message });
  }
};

module.exports = { getUserSurveys };
