const express = require('express');
const router = express.Router();

const surveyController = require('../controller/surveyCreate');
const surveyModifyController = require('../controller/surveyModify');
const surveyAllUserController = require('../controller/formAllUser');
const surveyGetController = require('../controller/surveyContentRead');
const findAnsweredSurvey = require('../controller/surveyView');
const surveyDeleteController = require('../controller/surveyDelete');

router.post('/', surveyController.createSurveyWithQuestionsAndChoices);
router.put('/:id', surveyModifyController.ModifySurveyWithQuestionsAndChoices);
router.get('/:id/forms', surveyAllUserController.getUserSurveys);
router.get('/:id/join', findAnsweredSurvey.findAnsweredSurvey);
router.get('/:id', surveyGetController.getSurveyById);
router.delete('/:id', surveyDeleteController.deleteSurveyAndRelatedData);

module.exports = router;
