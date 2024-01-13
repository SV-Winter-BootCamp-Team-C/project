const { Survey, User, Question, Choice } = require('../models');

const getSurveyById = async (req, res) => {
  const surveyId = req.params.id;

  try {
    // Sequelize를 사용하여 Survey 모델을 조회합니다.
    const survey = await Survey.findOne({
      where: { id: surveyId },
      attributes: [
        'id',
        'title',
        'description',
        'font',
        'color',
        'mainImageUrl',
        'buttonStyle',
        'createdAt',
        'deadline',
      ],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Question,
          attributes: ['id', 'type', 'content', 'imageUrl'],
          include: {
            model: Choice,
            attributes: ['id', 'option'],
          },
        },
      ],
    });

    if (!survey) {
      return res.status(404).json({ message: '설문을 찾을 수 없습니다.' });
    }

    // 최종 결과 구성
    const result = {
      surveyId: survey.id,
      userName: survey.User.name,
      title: survey.title,
      description: survey.description,
      font: survey.font,
      color: survey.color,
      buttonStyle: survey.buttonStyle,
      mainImageUrl: survey.mainImageUrl,
      createdAt: survey.createdAt,
      deadline: survey.deadline,
      questions: survey.Questions.map((question) => {
        // 질문에 대한 기본 구조
        const questionResponse = {
          questionId: question.id,
          type: question.type,
          content: question.content,
          imageUrl: question.imageUrl,
        };
        // 질문의 유형이 'SUBJECTIVE_QUESTION'가 아닐 경우에만 choices 추가
        if (question.type !== 'SUBJECTIVE_QUESTION') {
          questionResponse.choices = question.Choices.map((choice) => ({
            choiceId: choice.id,
            option: choice.option,
          }));
        }
        return questionResponse;
      }),
    };

    // 조회된 데이터 반환
    res.json(result);
  } catch (error) {
    // 오류 발생시 처리
    res.status(500).json({ message: '설문 생성 오류', error: error.message });
  }
};

module.exports = { getSurveyById };
