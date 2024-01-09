const express = require('express');
const router = express.Router();
const surveyController = require('../controller/surveyCreate');
const surveyAllUserController = require('../controller/formAllUser');
const surveyGetController = require('../controller/surveyContentRead');

router.post('/surveys', surveyController.createSurveyWithQuestionsAndChoices);
router.get('/:id/forms', surveyAllUserController.getUserSurveys);
router.get('/surveys/:id', surveyGetController.getSurveyById);

module.exports = router;
