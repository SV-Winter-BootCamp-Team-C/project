const { sequelize } = require('../models');
const { Survey, Question, Choice, Answer } = require('../models');

const ModifySurveyWithQuestionsAndChoices = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const {
      userId,
      title,
      description,
      open,
      font,
      color,
      buttonStyle,
      mainImageUrl,
      deadline,
      questions,
    } = req.body;

    console.log('Request body:', req.body); // 요청 본문 로그 찍기

    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return res
        .status(404)
        .json({ message: '요청하신 설문이 존재하지 않습니다.' });
    }

    // userId가 작성한 사람의 것이 아닌 경우
    if (survey.userId !== userId) {
      return res
        .status(403)
        .json({ message: userId + '는 설문을 작성한 사람이 아닙니다.' });
    }

    // 설문의 열람이 false가 아닌 경우
    if (open) {
      return res
        .status(403)
        .json({ message: '설문이 잠겨있어 접근 및 수정 권한이 없습니다.' });
    }

    for (const question of questions) {
      const answersCount = await Answer.count({
        where: {
          userId: userId,
          questionId: question.questionId,
        },
      });

      if (answersCount > 0) {
        return res
          .status(403)
          .json({ message: '이미 답변이 있는 설문은 수정할 수 없습니다.' });
      }
    }

    await sequelize.transaction(async (t) => {
      // 설문 정보 업데이트
      await survey.update(
        {
          title,
          description,
          open,
          font,
          color,
          buttonStyle,
          mainImageUrl,
          deadline,
        },
        { transaction: t },
      );

      // 기존 질문들을 삭제하고 새로운 질문들을 추가합니다.
      await Question.destroy({
        where: { surveyId: surveyId },
        transaction: t,
        force: true, // 하드 삭제를 적용
      });

      for (const question of questions) {
        // 새로운 질문 추가
        const newQuestion = await Question.create(
          {
            surveyId,
            type: question.type,
            content: question.content,
            imageUrl: question.imageUrl,
          },
          { transaction: t },
        );

        // 체크박스, 다중 선택, 드롭다운 질문의 경우 선택지 추가
        if (
          ['CHECKBOX', 'MULTIPLE_CHOICE', 'DROPDOWN'].includes(question.type)
        ) {
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

      // 설문 업데이트 시간 기록
      await survey.update({ updatedAt: new Date() }, { transaction: t });
    });

    const updatedSurvey = await Survey.findByPk(surveyId);

    console.log('Survey Update Result:', updatedSurvey);

    res.status(200).json({ message: '설문 수정 완료', updatedSurvey });
  } catch (error) {
    console.error('설문 수정 오류:', error.message);
    res.status(404).json({ message: '설문 수정 오류', error: error.message });
  }
};

module.exports = { ModifySurveyWithQuestionsAndChoices };
