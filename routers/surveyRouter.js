const express = require('express');
const router = express.Router();
const surveyController = require('../controller/surveyCreate');
const surveyAllUserController = require('../controller/formAllUser');

router.post('/surveys', surveyController.createSurveyWithQuestionsAndChoices);
router.get('/:id/forms', surveyAllUserController.getUserSurveys);

module.exports = router;
