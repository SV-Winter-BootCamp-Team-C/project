const { sequelize } = require('../models');
const { Question, Answer, Choice } = require('../models');

const createAnswer = async (req, res) => {
  const t = await sequelize.transaction(); // 트랜잭션 시작
  const surveyId = req.params.id;

  try {
    const { userId, questions } = req.body;
    console.log(`userId : ${userId}`);

    for (const question of questions) {
      // 질문의 타입을 확인
      const questionData = await Question.findByPk(question.questionId, { t });
      if (!questionData) {
        return res
          .status(400)
          .send(`Question with ID ${question.questionId} not found`);
      }
      if (questionData.surveyId != surveyId) {
        return res.status(400).send(`설문에 해당 질문이 없습니다.}`);
      }

      // 질문 타입에 따라 답변 저장
      if (
        questionData.type === 'CHECKBOX' &&
        Array.isArray(question.objContent)
      ) {
        // objContent의 각 요소에 대한 별도의 Answer 레코드 생성
        for (const objContentItem of question.objContent) {
          // console.log(`question objContentItem : ${objContentItem}`);
          const option = await Choice.findByPk(objContentItem, { t });
          if (!option) {
            return res
              .status(400)
              .send(`Choice with ID ${objContentItem} not found`);
          }
          if (option.questionId != question.questionId) {
            return res.status(400).send(`질문에 해당 선택지가 없습니다.`);
          }

          // 중복 확인
          const existingAnswer = await Answer.findOne({
            where: {
              questionId: question.questionId,
              userId: userId,
              objContent: objContentItem,
            },
            transaction: t,
          });

          if (!existingAnswer) {
            await Answer.create({
              questionId: question.questionId,
              userId: userId,
              objContent: objContentItem,
              subContent: null,
            });
          }
        }
      } else {
        // SUBJECTIVE_QUESTION || MULTIPLE_CHOICE || DROPDOWN
        // 중복 확인
        const existingAnswer = await Answer.findOne({
          where: {
            questionId: question.questionId,
            userId: userId,
            subContent: question.subContent || null,
            objContent: question.objContent || null,
          },
          transaction: t,
        });

        if (!existingAnswer) {
          await Answer.create(
            {
              questionId: question.questionId,
              userId: userId,
              subContent: question.subContent || null,
              objContent: question.objContent || null,
            },
            { transaction: t },
          );
        }
      }

      console.log(`questionId : ${question.questionId}`);
      console.log(`question content : ${question.content} `);
      console.log(`question objContent : ${question.objContent}`);
      console.log(`question subContent : ${question.subContent}`);
    }

    // Answer 테이블을 userId로 조회
    // 객관식 선택지의 경우 count 올라감
    // 주어진 userId로 Answer 테이블 조회
    const answers = await Answer.findAll({
      where: { userId: userId },
      include: [
        {
          model: Question,
          required: true,
        },
      ],
    });

    for (const answer of answers) {
      if (answer.Question.type !== 'SUBJECTIVE_QUESTION') {
        // 동일한 선택지에 대한 이전 답변이 있는지 확인
        const previousAnswer = await Answer.findOne({
          where: {
            userId: userId,
            questionId: answer.questionId,
            objContent: answer.objContent,
          },
        });

        // 이전 답변이 없는 경우에만 count 증가
        if (!previousAnswer) {
          await Choice.increment('count', {
            by: 1,
            where: { id: answer.objContent },
          });
        }
      }
    }

    await t.commit();
    res.status(201).json({ message: '저장되었습니다.' });
  } catch (error) {
    await t.rollback();
    res
      .status(408)
      .json({ message: '저장을 실패하였습니다. : ' + error.message });
  }
};

module.exports = { createAnswer };
