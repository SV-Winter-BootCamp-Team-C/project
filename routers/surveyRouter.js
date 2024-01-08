const express = require('express');
const router = express.Router();
const surveyController = require('../controller/surveyCreate');

router.post('/surveys', surveyController.createSurveyWithQuestionsAndChoices);

module.exports = router;
