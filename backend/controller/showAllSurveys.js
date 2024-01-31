const { Survey, Answer, Question } = require('../models');
const { surveyTitleSearch } = require('./surveyTitleSearch');
const Redis = require('ioredis');
const redisClient = new Redis({
  host: '172.31.20.50',
  port: 6379,
});

const showAllSurveys = async (req, res) => {
  try {
    // Request로부터 Parameter 값들 가져오기
    const userId = req.params.id;
    const pageLimit = req.query.limit;
    const page = req.query.page;
    const startIndex = (page - 1) * pageLimit;
    const title = req.query.title;

    if (!title) {
      const cachedSurveys = await redisClient.get('cachedSurveys');
      const cachedPages = await redisClient.get('cachedPages');

      if (cachedSurveys) {
        const startTime = new Date();

        const surveys = JSON.parse(cachedSurveys);
        const pages = JSON.parse(cachedPages);
        
        const endTime = new Date();
        const elapsedTime = endTime - startTime;
        console.log(`Redis cache에 삽입된 후 코드 실행 시간: ${elapsedTime} 밀리초`);

        res.status(200).json({
          surveys: surveys,
          totalPages: pages,
        });
      } else {
      // 전체 설문에 대해 attended_count 계산
      const startTime = new Date();

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
          mainImageUrl: survey.mainImageUrl || null,
          createdAt: survey.createdAt,
          updatedAt: survey.updatedAt,
          deadline: survey.deadline,
          isAttended: !!answer,
          attendCount: userCount,
        });
      }

      // 정렬
      if ('attendCount' in req.query) {
        preResult.sort((a, b) => b.attendCount - a.attendCount);
      } else if ('deadline' in req.query) {
        preResult.sort((a, b) => a.deadline - b.deadline);
      } else {
        preResult.sort((a, b) => b.createdAt - a.createdAt);
      }

      // 페이지에 해당하는 데이터 추출
      const pagedSurveys = preResult.slice(startIndex, startIndex + pageLimit);

      const endTime = new Date();
      // 데이터를 JSON 형태로 변환하여 Redis에 캐시
      await redisClient.set('cachedSurveys', JSON.stringify(pagedSurveys));
      await redisClient.set('cachedPages', JSON.stringify(Math.ceil(preResult.length / pageLimit)));

      const elapsedTime = endTime - startTime;
      console.log(`Redis cache에 삽입되기 전 코드 실행 시간: ${elapsedTime} 밀리초`);
  
      res.status(200).json({
        surveys: pagedSurveys,
        totalPages: Math.ceil(preResult.length / pageLimit),
      });}
    } else {

      const cachedSurveysTitle = await redisClient.get('cachedSurveysTitle');
      const cachedPagesTitle = await redisClient.get('cachedPagesTitle');
      
      if (cachedSurveysTitle) {
        // 캐시된 데이터가 있을 경우, JSON 형태로 변환하여 반환
        const startTime = new Date();

        const surveys = JSON.parse(cachedSurveysTitle);
        const pages = JSON.parse(cachedPagesTitle);

        const endTime = new Date();
        const elapsedTime = endTime - startTime;
        console.log(`Redis cache에 삽입된 후 코드 실행 시간: ${elapsedTime} 밀리초`);
        
        res.status(200).json({
          surveys: surveys,
          totalPages: pages,
        });
      } else {

       
        const startTime = new Date();
        const selectSurveys = await Survey.findAll({
          where: { open: true },
          attributes: ['id', 'title'],
        });
  
        if (!selectSurveys.length) {
          return res.status(204).json({ message: '작성된 설문지가 없습니다.' });
        }
       
        const titleList = selectSurveys.map((survey) => ({
          surveyId: survey.id,
          surveyTitle: survey.title,
        }));
  
        const searchList = { surveys: titleList, title: title };
        const resultList = surveyTitleSearch(searchList);
        const len = resultList.surveys.length;
  
        if (len === 0) {
          return res.status(208).json({ message: '검색된 설문지가 없습니다.' });
        }
  
        const sortedList = [];
        for (const surveyId of resultList.surveys) {
          const survey = await Survey.findOne({
            where: { id: surveyId },
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
            mainImageUrl: survey.dataValues.mainImageUrl || null,
            createdAt: survey.dataValues.createdAt,
            updatedAt: survey.dataValues.updatedAt,
            deadline: survey.dataValues.deadline,
            isAttended: !!answer,
            attendCount: userCount,
          });
        }
  
        // 정렬
        if ('attendCount' in req.query) {
          sortedList.sort((a, b) => b.attendCount - a.attendCount);
        } else if ('deadline' in req.query) {
          sortedList.sort((a, b) => a.deadline - b.deadline);
        } else {
          sortedList.sort((a, b) => b.createdAt - a.createdAt);
        }
  
        // 페이지에 해당하는 데이터 추출
        const startIndex = (page - 1) * pageLimit;
        const endIndex = startIndex + pageLimit;
        const pagedSortedList = sortedList.slice(startIndex, endIndex);
  
        const endTime = new Date();
        
        await redisClient.set('cachedSurveysTitle', JSON.stringify(pagedSortedList));
        await redisClient.set('cachedPagesTitle', JSON.stringify(Math.ceil(Math.ceil(len / pageLimit))));

        const elapsedTime = endTime - startTime;
        console.log(`Redis cache에 삽입되기 전 코드 실행 시간: ${elapsedTime} 밀리초`);
  
        res
          .status(200)
          .json({
            sortedList: pagedSortedList,
            totalPages: Math.ceil(len / pageLimit),
          });
      }
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '데이터를 불러오는데 실패했습니다.' });
  }
};

module.exports = { showAllSurveys };

