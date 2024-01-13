const { Survey, User, Question, Answer, Choice } = require('../models');

const getAnswerByuserId = async (req, res) => {
  try {
    const { userId, surveyId } = req.params;

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
            },
            {
              model: Answer,
              where: { userId: userId },
              required: false,
            },
          ],
        },
      ],
    });

    if (!survey) {
      return res.status(404).send('Survey not found');
    }

    const responseData = {
      surveyId: survey.id,
      userName: survey.User.name,
      title: survey.title,
      description: survey.description,
      font: survey.font,
      color: survey.color,
      buttonStyle: survey.buttonStyle,
      mainImageUrl: survey.mainImageUrl,
      createAt: survey.createdAt,
      deadline: survey.deadline,
      questions: survey.Questions.map((question) => {
        const questionResponse = {
          questionId: question.id,
          type: question.type,
          content: question.content,
          imageUrl: question.imageUrl,
        };

        // 'SUBJECTIVE_QUESTION'이 아닌 경우에만 choices와 objContent 추가
        if (question.type !== 'SUBJECTIVE_QUESTION') {
          questionResponse.choices = question.Choices.map((choice) => ({
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
    res
      .status(500)
      .send('사용자의 답변을 불러오는 것을 실패하였습니다.' + err.message);
  }
};
module.exports = { getAnswerByuserId };
