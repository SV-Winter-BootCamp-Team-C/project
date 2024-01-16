// surveyModify.js
const { sequelize } = require('../models');
const { Survey, Question, Choice, Answer } = require('../models');
const { uploadFileToS3 } = require('./imageUpload'); // 필요에 따라 경로를 조정하세요

const ModifySurveyWithQuestionsAndChoices = async (surveyData, res) => {
  try {
    const {
      id: surveyId,
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
      //questionImageFiles, // 질문 이미지 파일 배열
    } = surveyData;

    // 설문 조사의 소유권과 권한을 확인
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return res.status(404).json({ message: '설문이 존재하지 않습니다.' });
    }

    if (survey.userId !== userId) {
      return res
        .status(400)
        .json({ message: userId + '는 설문을 작성한 사람이 아닙니다.' });
    }

    // 접근 권한이 있는지 확인
    if (open) {
      return res
        .status(401)
        .json({ message: '설문이 잠겨있어 접근 및 수정 권한이 없습니다.' });
    }

    // 기존 답변의 존재 여부 확인
    const answersCount = await Answer.count({ where: { userId: userId } });
    if (answersCount > 0) {
      return res
        .status(403)
        .json({ message: '이미 답변이 있는 설문은 수정할 수 없습니다.' });
    }

    await sequelize.transaction(async (t) => {
      console.log('트랜잭션 시작');

      // 메인 이미지 업로드/업데이트 처리
      let updatedMainImageUrl = mainImageUrl;
      if (surveyData.mainImageFile) {
        console.log('메인 이미지 업로드 중');
        updatedMainImageUrl = await uploadFileToS3(surveyData.mainImageFile);
        console.log('메인 이미지 업로드 완료: ', updatedMainImageUrl);
      }

      // 설문 정보 업데이트
      console.log('설문 정보 업데이트 중');
      await survey.update(
        {
          title,
          description,
          open,
          font,
          color,
          buttonStyle,
          mainImageUrl: updatedMainImageUrl,
          deadline,
        },
        { transaction: t },
      );
      console.log('설문 정보 업데이트 완료');

      // 기존 질문들 삭제 후 재생성
      console.log('기존 질문 삭제 중');
      await Question.destroy({
        where: { surveyId: surveyId },
        transaction: t,
        force: true,
      });
      console.log('기존 질문 삭제 완료');

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

        // 새로운 질문 생성
        const imageUrl = question.imageUrl || ''; // 이미지 URL을 설정합니다.

        const newQuestion = await Question.create(
          {
            surveyId,
            type: question.type,
            content: question.content,
            imageUrl: imageUrl,
          },
          { transaction: t },
        );

        console.log(`questionId: ${newQuestion.id}`);
        console.log(`imageUrl for questionId ${newQuestion.id}: ${imageUrl}`);

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

      // 설문 업데이트 시간 기록
      await survey.update({ updatedAt: new Date() }, { transaction: t });
    });

    const updatedSurvey = await Survey.findByPk(surveyId);
    res.status(200).json({ message: '설문 수정 완료', updatedSurvey });
  } catch (error) {
    console.error('설문 수정 오류:', error.message);
    res.status(404).json({ message: '설문 수정 오류', error: error.message });
  }
};

module.exports = { ModifySurveyWithQuestionsAndChoices };
