const { sequelize } = require('../models');
const { Survey, Question, Choice } = require('../models');

const deleteSurveyAndRelatedData = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { userId } = req.body;

    // 설문 조회
    const survey = await Survey.findByPk(surveyId);

    // 설문이 존재하지 않는 경우
    if (!survey) {
      return res.status(404).json({ message: '삭제할 설문이 없습니다.' });
    }

    // 사용자 권한 확인
    if (survey.userId !== userId) {
      return res.status(403).json({ message: '설문 삭제 권한이 없습니다.' });
    }

    await sequelize.transaction(async (t) => {
      // 설문과 관련된 데이터 삭제
      const questionIds = await sequelize.query(
        `SELECT id FROM "Question" WHERE "surveyId" = :surveyId`,
        {
          replacements: { surveyId },
          type: sequelize.QueryTypes.SELECT,
        },
      );

      // questionIds에서 id만 추출하여 배열로 만들기
      const questionIdArray = questionIds.map((item) => item.id);

      // 직접 배열을 사용하여 Choice.destroy 호출
      await Choice.destroy({
        where: {
          questionId: questionIdArray,
        },
        transaction: t,
        force: true, // 하드 삭제를 적용
      });

      await Question.destroy({
        where: { surveyId: surveyId },
        transaction: t,
        force: true, // 하드 삭제를 적용
      });

      await Survey.destroy({
        where: { id: surveyId },
        transaction: t,
        force: true, // 하드 삭제를 적용
      });
    });

    res.status(200).json({ message: '설문 및 관련 데이터 삭제 완료' });
  } catch (error) {
    console.error('설문 삭제 오류:', error.message);
    res.status(500).json({ message: '설문 삭제 오류', error: error.message });
  }
};

module.exports = { deleteSurveyAndRelatedData };
