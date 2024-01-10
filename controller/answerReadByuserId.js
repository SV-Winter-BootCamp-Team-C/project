const { Survey, Question, Answer } = require('../models');

const getAnswerByuserId = async (req, res) => {
  try {
    const { userId, surveyId } = req.params;

    const survey = await Survey.findByPk(surveyId, {
      include: [
        {
          model: Question,
          include: [
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
      main_url: survey.url,
      title: survey.title,
      description: survey.description,
      create_at: survey.createdAt,
      deadline: survey.deadline,
      user_id: parseInt(userId),
      questions: survey.Questions.map((question) => {
        // 각 질문에 대한 모든 objContent 값을 배열로 반환
        const objContents = question.Answers.map(
          (answer) => answer.objContent,
        ).filter((content) => content != null); // null이 아닌 값만 포함
        // obj_content 필드를 조건부로 반환
        const questionResponse = {
          question_id: question.id,
          content: question.content,
          image_url: question.imageUrl,
          sub_content: question.Answers.find((answer) => answer.subContent)
            ?.subContent,
        };

        if (objContents.length > 0) {
          questionResponse.obj_content = objContents;
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
