const express = require('express');
const router = express.Router();
const surveyController = require('../controller/surveyCreate');
const surveyGetController = require('../controller/surveyReadById');

router.post('/surveys', surveyController.createSurveyWithQuestionsAndChoices);
router.get('/surveys/:id', surveyGetController.getSurveyById);
module.exports = router;
