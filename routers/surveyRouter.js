const express = require('express');
const router = express.Router();
const surveyController = require('../controller/surveyCreate');
const surveyAllUserController = require('../controller/formAllUser');
const surveyGetController = require('../controller/surveyContentRead');
const surveyAllResultCotroller = require('../controller/surveyAllResult');

router.post('/', surveyController.createSurveyWithQuestionsAndChoices);
router.get('/:id/forms', surveyAllUserController.getUserSurveys);
router.get('/:id', surveyGetController.getSurveyById);
router.get('/:surveyId/results', surveyAllResultCotroller.getServeyAllResults);

module.exports = router;
