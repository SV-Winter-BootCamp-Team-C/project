const { pg } = require('../models/database');

const getSurveyById = async (req, res) => {
  const surveyId = req.params.id;
  try {
    const surveyQuery = `SELECT s.*, u.name as user_name
    FROM "Survey" s
    JOIN "User" u ON s.user_id = u.id
    WHERE s.id = $1;`;

    const surveyResult = await pg.query(surveyQuery, [surveyId]);
    if (surveyResult.rows.length === 0) {
      return null;
    }
    const survey = surveyResult.rows[0];

    const questionsQuery = `SELECT * FROM "Question" WHERE survey_id = $1;`;

    const questionsResult = await pg.query(questionsQuery, [surveyId]);

    // 각 질문에 대한 선택지 조회
    for (const question of questionsResult.rows) {
      const q_type = question.type;
      if (q_type === 'SUBJECTIVE_QUESTION') {
        continue;
      }
      const choicesQuery = `
        SELECT * FROM "Choice" WHERE question_id = $1;
      `;
      const choicesResult = await pg.query(choicesQuery, [question.id]);
      question.choices = choicesResult.rows;
    }

    // 최종 결과 구성
    const result = {
      survey_id: survey.id,
      user_name: survey.user_name,
      title: survey.title,
      font: survey.font,
      color: survey.color,
      main_image_url: survey.main_image_url,
      created_at: survey.created_at,
      deadline: survey.deadline,
      questions: questionsResult.rows,
    };

    // 조회된 데이터 반환
    res.json(result);
  } catch (error) {
    // 오류 발생시 처리
    console.error('Error in getting survey by id :', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getSurveyById };
