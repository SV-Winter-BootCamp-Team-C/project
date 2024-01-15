const { sequelize } = require('../models');
const { Survey, Question, Choice } = require('../models');

const createSurveyWithQuestionsAndChoices = async (surveyData, res) => {
  const t = await sequelize.transaction();

  try {
    console.log('Received survey data:', surveyData);

    const {
      userId,
      title,
      description,
      open,
      font,
      color,
      buttonStyle,
      deadline,
      questions,
      mainImageUrl, // 메인 이미지 URL
      //imageUrl, // 질문 이미지 URL 배열
    } = surveyData;

    console.log('요청 본문 수신:', surveyData);

    const surveyUrl = `http://yourwebsite.com/survey/placeholder`;

    const survey = await Survey.create(
      {
        userId,
        title,
        description,
        open,
        url: surveyUrl,
        font,
        color,
        buttonStyle,
        mainImageUrl,
        deadline,
      },
      { transaction: t },
    );

    const surveyId = survey.id;
    const updatedSurveyUrl = `http://yourwebsite.com/survey/${surveyId}`;

    await Survey.update(
      { url: updatedSurveyUrl },
      {
        where: { id: surveyId },
        transaction: t,
      },
    );

    for (const question of questions) {
      if (
        ![
          'MULTIPLE_CHOICE',
          'SUBJECTIVE_QUESTION',
          'CHECKBOX',
          'DROPDOWN',
        ].includes(question.type)
      ) {
        throw new Error('Invalid question type');
      }

      const questionImageUrl = question.imageUrl;

      const newQuestion = await Question.create(
        {
          surveyId,
          type: question.type,
          content: question.content,
          imageUrl: questionImageUrl, // 여기에서 사용
        },
        { transaction: t },
      );

      console.log(`questionId: ${newQuestion.id}`);

      if (question.choices && question.choices.length > 0) {
        for (const choice of question.choices) {
          await Choice.create(
            {
              questionId: newQuestion.id,
              option: choice.option,
            },
            { transaction: t },
          );
        }
      }
    }

    await t.commit();
    res.status(201).json({ message: '설문 생성 완료', surveyId: surveyId });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: '설문 생성 오류', error: error.message });
  }
};

module.exports = { createSurveyWithQuestionsAndChoices };
