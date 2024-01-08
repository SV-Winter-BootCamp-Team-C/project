const { pg } = require('../models/database');

const createSurveyWithQuestionsAndChoices = async (req, res) => {
  try {
    const { user_id, title, font, color, button_style, main_image_url, deadline, questions } = req.body;

    await pg.query('BEGIN');

    const defaultUrl = 'http://example.com/survey';

    const surveyResult = await pg.query(
      'INSERT INTO "Survey" (user_id, title, url, font, color, button_style, main_image_url, deadline) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',

      [user_id, title, defaultUrl, font, color, button_style, main_image_url, deadline],
    );

    const surveyId = surveyResult.rows[0].id;

    for (const question of questions) {
      console.log(`${question.type}`);
      if (!['MULTIPLE_CHOICE', 'SUBJECTIVE_QUESTION', 'CHECKBOX', 'DROPDOWN'].includes(question.type)) {
        throw new Error('Invalid question type');
      }

      const questionResult = await pg.query(
        'INSERT INTO "Question" (survey_id, type, content, image_url) VALUES ($1, $2, $3, $4) RETURNING id',
        [surveyId, question.type, question.content, question.image_url],
      );
      const questionId = questionResult.rows[0].id;

      if (question.choices) {
        for (const choice of question.choices) {
          await pg.query('INSERT INTO "Choice" (question_id, option) VALUES ($1, $2)', [questionId, choice.option]);
        }
      }
    }

    await pg.query('COMMIT');
    res.status(201).json({ message: '설문 생성 완료', surveyId: surveyId });
  } catch (error) {
    await pg.query('ROLLBACK');
    res.status(500).json({ message: '설문 생성 오류', error: error.message });
  }
};

module.exports = { createSurveyWithQuestionsAndChoices };
