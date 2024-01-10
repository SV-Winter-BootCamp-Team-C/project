const express = require('express');
const router = express.Router();
const surveyController = require('../controller/surveyCreate');
const surveyModifyController = require('../controller/surveyModify');
const surveyAllUserController = require('../controller/formAllUser');
const surveyGetController = require('../controller/surveyContentRead');
const findAnsweredSurvey = require('../controller/surveyView');
const surveyAnswerController = require('../controller/answerSave');

router.post('/', surveyController.createSurveyWithQuestionsAndChoices);
router.put('/:id', surveyModifyController.ModifySurveyWithQuestionsAndChoices);
router.get('/:id/forms', surveyAllUserController.getUserSurveys);
router.get('/:id/join', findAnsweredSurvey.findAnsweredSurvey);
router.get('/:id', surveyGetController.getSurveyById);
router.post('/:id', surveyAnswerController.createAnswer);

module.exports = router;
