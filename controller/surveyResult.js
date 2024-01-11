const { User, Survey, Question, Choice, Answer } = require('../models');

const surveyResult = async (req, res) => {
  try {
    const surveyId = req.params.id;

    const survey = await Survey.findOne({
      where: { id: surveyId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['name'], // 필요한 속성만 선택적으로 가져올 수 있습니다.
        },
        {
          model: Question,
          as: 'Questions',
          include: [
            {
              model: Choice,
              as: 'Choices',
            },
            {
              model: Answer,
              as: 'Answers',
            },
          ],
        },
      ],
    });

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    const response = {
      user_name: survey.User.name,
      title: survey.title,
      open: survey.open,
      created_at: survey.createdAt,
      updated_at: survey.updatedAt,
      deadline: survey.deadline,
      questions: survey.Questions.map((question) => {
        if (question.type === 'CHECKBOX') {
          return {
            question_id: question.id,
            type: question.type,
            content: question.content,
            image_url: question.imageUrl,
            choices: question.Choices.map((choice) => ({
              choice_id: choice.id,
              option: choice.option,
              count: choice.count,
            })),
          };
        } else if (question.type === 'SUBJECTIVE_QUESTION') {
          return {
            question_id: question.id,
            type: question.type,
            content: question.content,
            image_url: question.imageUrl,
            answers: question.Answers.map((answer) => ({
              answer_id: answer.id,
              content: answer.subContent,
            })),
          };
        } else if (
          question.type === 'MULTIPLE_CHOICE' ||
          question.type === 'DROPDOWN'
        ) {
          return {
            question_id: question.id,
            type: question.type,
            content: question.content,
            image_url: question.imageUrl,
            answers: question.Answers.map((answer) => ({
              answer_id: answer.id,
              objContent: answer.objContent,
            })),
          };
        }
      }),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { surveyResult };
