const { Survey, User, Question, Answer, Choice } = require('../models');

const getAnswerByuserId = async (req, res) => {
  try {
    const { userId, surveyId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const survey = await Survey.findByPk(surveyId, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Question,
          attributes: ['id', 'type', 'content', 'imageUrl'],
          include: [
            {
              model: Choice,
              attributes: ['id', 'option'],
              order: [['id', 'ASC']],
            },
            {
              model: Answer,
              where: { userId: userId },
            },
          ],
        },
      ],
    });

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    const responseData = {
      surveyId: survey.id,
      userName: survey.User.name,
      title: survey.title,
      description: survey.description,
      font: survey.font,
      color: survey.color,
      buttonStyle: survey.buttonStyle,
      mainImageUrl: survey.mainImageUrl || null, // 메인 이미지 URL이 null 또는 빈 문자열인 경우 빈 문자열로 설정
      createAt: survey.createdAt,
      deadline: survey.deadline,
      questions: survey.Questions.map((question) => {
        const questionResponse = {
          questionId: question.id,
          type: question.type,
          content: question.content,
          imageUrl: question.imageUrl || null, // 질문 이미지 URL이 null 또는 빈 문자열인 경우 빈 문자열로 설정
        };

        // 'SUBJECTIVE_QUESTION'이 아닌 경우에만 choices와 objContent 추가
        if (question.type !== 'SUBJECTIVE_QUESTION') {
          questionResponse.choices = question.Choices.sort(
            (a, b) => a.id - b.id,
          ).map((choice) => ({
            choiceId: choice.id,
            option: choice.option,
          }));
          questionResponse.objContent = question.Answers.map(
            (answer) => answer.objContent,
          ).filter((content) => content != null);
        }

        // 'SUBJECTIVE_QUESTION'인 경우에만 subContent 추가
        if (question.type === 'SUBJECTIVE_QUESTION') {
          questionResponse.subContent = question.Answers.find(
            (answer) => answer.subContent,
          )?.subContent;
        }

        return questionResponse;
      }),
    };

    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '사용자의 답변을 불러오는 것을 실패하였습니다.' + err.message,
    });
  }
};
module.exports = { getAnswerByuserId };
