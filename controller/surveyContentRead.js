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
      survey_id: survey.id,
      user_name: survey.User.name,
      title: survey.title,
      description: survey.description,
      font: survey.font,
      color: survey.color,
      main_image_url: survey.mainImageUrl,
      created_at: survey.createdAt,
      deadline: survey.deadline,
      questions: survey.Questions.map((question) => ({
        question_id: question.id,
        content: question.content,
        imageUrl: question.imageUrl,
        choices: question.Choices.map((choice) => ({
          choice_id: choice.id,
          option: choice.option,
        })),
      })),
    };

    // 조회된 데이터 반환
    res.json(result);
  } catch (error) {
    // 오류 발생시 처리
    res.status(500).json({ message: '설문 생성 오류', error: error.message });
  }
};

module.exports = { getSurveyById };
