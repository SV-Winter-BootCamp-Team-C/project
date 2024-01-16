const { sequelize } = require('../models');
const { Survey, Question, Choice } = require('../models');
const {
  uploadFileToS3,
  //deleteFileFromS3,
  updateFileOnS3,
} = require('./imageUpload');

const ModifySurveyWithQuestionsAndChoices = async (surveyData, res) => {
  const {
    id: surveyId,
    userId,
    title,
    description,
    open,
    font,
    color,
    buttonStyle,
    mainImageUrlFile, // mainImageUrl을 파일 객체로 받습니다.
    deadline,
    questions,
  } = surveyData;

  let t;

  try {
    console.log('Survey data:', surveyData);
    const survey = await Survey.findByPk(surveyId);
    if (!survey || survey.userId !== userId) {
      return res.status(404).json({
        message: userId + '는 설문을 작성한 사람이 아닙니다.',
        resultCode: 403,
      });
    }

    // 접근 권한이 있는지 확인
    if (survey.userId !== userId || open) {
      return res.status(403).json({
        message: '접근 및 수정 권한이 없습니다.',
        resultCode: 403,
      });
    }

    // // 답변이 있는지 확인
    // const answersCount = await Answer.count({
    //   where: {
    //     userId: userId,
    //   },
    // });

    // if (answersCount > 0) {
    //   return res.status(403).json({
    //     message: '이미 답변이 있는 설문은 수정할 수 없습니다.',
    //     resultCode: 403, // Modify this result code as needed
    //   });
    // }

    // 트랜잭션 시작
    t = await sequelize.transaction();

    // mainImageUrl 업데이트 (새로운 이미지가 제공된 경우에만)
    let newMainImageUrl;
    if (mainImageUrlFile) {
      newMainImageUrl = await updateFileOnS3(
        survey.mainImageUrl,
        mainImageUrlFile,
      );
    } else {
      newMainImageUrl = survey.mainImageUrl; // 기존 이미지 유지
    }

    await survey.update(
      {
        title,
        description,
        open,
        font,
        color,
        buttonStyle,
        mainImageUrl: newMainImageUrl,
        deadline,
      },
      { transaction: t },
    );

    // 기존 질문들을 찾아서 삭제
    await Question.destroy({
      where: { surveyId: surveyId },
      transaction: t,
      force: true,
    });

    for (const questionData of questions) {
      let questionImageUrl = '';
      if (questionData.imageFile) {
        questionImageUrl = await uploadFileToS3(questionData.imageFile);
      }

      const question = await Question.create(
        {
          surveyId: surveyId,
          type: questionData.type,
          content: questionData.content,
          imageUrl: questionImageUrl,
        },
        { transaction: t },
      );

      // 선택지 추가
      if (
        ['CHECKBOX', 'MULTIPLE_CHOICE', 'DROPDOWN'].includes(questionData.type)
      ) {
        for (const choice of questionData.choices) {
          await Choice.create(
            {
              questionId: question.id, // 여기서 question.id를 사용합니다
              option: choice.option,
            },
            { transaction: t },
          );
        }
      }
    }

    // 설문 업데이트 시간 기록 및 트랜잭션 커밋
    await survey.update({ updatedAt: new Date() }, { transaction: t });
    await t.commit();
    const updatedSurvey = await Survey.findByPk(surveyId);
    console.log('Survey Update Result:', updatedSurvey.toJSON());

    res.status(200).json({
      message: '설문 수정에 성공하였습니다.',
      survey: updatedSurvey,
    });
  } catch (error) {
    console.error('설문 수정 오류:', error.message);

    // 트랜잭션 롤백
    if (t) {
      await t.rollback();
    }

    res.status(400).json({
      message: '설문을 수정하는데 실패하였습니다.',
      resultCode: 400,
      error: error.message,
    });
  }
};

module.exports = { ModifySurveyWithQuestionsAndChoices };
