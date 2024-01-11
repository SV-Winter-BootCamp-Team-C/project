const { Survey, Question, Answer } = require('../models');

const getAnswerByuserId = async (req, res) => {
  try {
    const { userId, surveyId } = req.params;
    const pageLimit = req.query.limit;
    const pageOffset = (req.query.page - 1) * pageLimit;

    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return res.status(404).send('Survey not found');
    }

    const totalQuestions = await Question.count({
      where: { surveyId: surveyId },
    });
    const totalPages = Math.ceil(totalQuestions / pageLimit);

    const questions = await Question.findAll({
      where: { surveyId: surveyId },
      limit: pageLimit,
      offset: pageOffset,
      include: [
        {
          model: Answer,
          where: { userId: userId },
          required: false,
        },
      ],
    });

    const responseData = {
      mainUrl: survey.url,
      title: survey.title,
      description: survey.description,
      createAt: survey.createdAt,
      deadline: survey.deadline,
      user_id: parseInt(userId),
      totalPages: totalPages,
      questions: questions.map((question) => {
        // 각 질문에 대한 모든 objContent 값을 배열로 반환
        const objContents = question.Answers.map(
          (answer) => answer.objContent,
        ).filter((content) => content != null); // null이 아닌 값만 포함
        // obj_content 필드를 조건부로 반환
        const questionResponse = {
          question_id: question.id,
          content: question.content,
          image_url: question.imageUrl,
          objContent: objContents.length > 0 ? objContents : null, // objContents 배열이 비어있지 않으면 반환
          subContent: question.Answers.find((answer) => answer.subContent)
            ?.subContent,
        };

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
