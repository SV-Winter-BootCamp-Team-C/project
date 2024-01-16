const { sequelize } = require('../models');
const { Survey, Question, Choice, Answer } = require('../models');
const {
  uploadFileToS3,
  //deleteFileFromS3,
  updateFileOnS3,
} = require('./imageUpload'); // 필요에 따라 경로를 조정하세요

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
      //mainImageFile, // 메인 이미지 파일
      questionImageFiles, // 질문 이미지 파일 배열
    } = surveyData;

    // 설문 조사의 소유권과 권한을 확인
    const survey = await Survey.findByPk(surveyId);
    if (!survey || survey.userId !== userId) {
      return res
        .status(404)
        .json({ message: userId + '는 설문을 작성한 사람이 아닙니다.' });
    }

    if (survey.userId !== userId || open) {
      return res.status(403).json({ message: '접근 및 수정 권한이 없습니다.' });
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
  if (surveyData.mainImageFile) { // 클라이언트에서 mainImageFile로 파일을 받고 있다고 가정
    console.log('메인 이미지 업로드 중');
    // S3에 파일을 업로드하고 URL을 업데이트합니다.
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

      for (const [index, question] of questions.entries()) {
        console.log(`새로운 질문 생성 중 ${index + 1}`);
        // 새로운 질문 생성
        const imageUrl =
          questionImageFiles && questionImageFiles[index]
            ? await uploadFileToS3(questionImageFiles[index])
            : null;
        console.log(`질문 이미지 업로드 중 ${index + 1}: `, imageUrl);

        const newQuestion = await Question.create(
          {
            surveyId,
            type: question.type,
            content: question.content,
            imageUrl: imageUrl,
          },
          { transaction: t },
        );
        console.log(`새로운 질문 생성 완료 ${index + 1}`);

        // 필요한 경우 선택지 추가
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
    res.status(200).json({ message: '설문 수정 완료', updatedSurvey });
  } catch (error) {
    console.error('설문 수정 오류:', error.message);
    res.status(404).json({ message: '설문 수정 오류', error: error.message });
  }
};

module.exports = { ModifySurveyWithQuestionsAndChoices };
