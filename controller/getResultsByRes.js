const { User, Choice, Answer, Question, Survey } = require('../models');

const getResultsByResponses = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return res.status(404).send('Survey not found');
    }
    const questions = await Question.findAll({
      where: { surveyId: surveyId },
      include: [
        {
          model: Choice,
          attributes: ['id', 'option', 'count'],
        },
        {
          model: Answer,
          include: [
            {
              model: User,
              attributes: ['id'],
            },
          ],
        },
      ],
    });

    // 결과 객체
    const surveyData = {
      title: survey.title, // 설문 제목
      list: {
        head: questions.map((q) => q.content), // 질문
        rows: [], // 각 사용자의 응답
      },
    };

    // A map to store user answers by userId
    const userAnswersMap = {};

    // 질문 반복하면서 응답과 선택지 mapping
    questions.forEach((question) => {
      question.Answers.forEach((answer) => {
        const choiceMap = question.Choices.reduce((map, choice) => {
          map[choice.id] = choice.option;
          return map;
        }, {});

        // 사용자 답변 배열 초기화
        if (!userAnswersMap[answer.userId]) {
          userAnswersMap[answer.userId] = {
            userId: answer.userId,
            createdAt: answer.createdAt.toISOString(),
            responses: new Array(questions.length).fill(''),
          };
        }
        // 질문에 맞는 사용자의 답변 할당함
        const questionIndex = questions.findIndex(
          (q) => q.id === answer.questionId,
        );
        if (questionIndex !== -1) {
          userAnswersMap[answer.userId].responses[questionIndex] =
            answer.subContent || choiceMap[answer.objContent]; //objContent 에 해당하는 Choice의  content 반환
        }
      });
    });

    // Add user answers to the rows
    surveyData.list.rows = Object.values(userAnswersMap);

    res.json(surveyData);
  } catch (error) {
    console.error('Error fetching survey data:', error);
    res.status(500).send('Internal Server Error');
  }
};
module.exports = { getResultsByResponses };
