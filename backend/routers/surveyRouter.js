const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFileToS3 } = require('../controller/imageUpload');
const surveyController = require('../controller/surveyCreate');
const surveyModifyController = require('../controller/surveyModify');
const surveyAllUserController = require('../controller/formAllUser');
const surveyGetController = require('../controller/surveyContentRead');
const surveyAnsweredController = require('../controller/surveyAnswered');
const showAllSurveysController = require('../controller/showAllSurveys');
const surveyDeleteController = require('../controller/surveyDelete');
const surveyAnswerController = require('../controller/answerSave');
const getSurveyUrlController = require('../controller/getSurveyUrl');
const surveyResultController = require('../controller/surveyResult');
const getAnswerController = require('../controller/answerReadByuserId');
const { sendSurveyEmailWithSurveyId } = require('../controller/urlShare');
const getResultController = require('../controller/getResultsByRes');

// Multer 설정 및 초기화
const storage = multer.memoryStorage(); // 파일을 메모리에 저장
const uploadMiddleware = multer({
  storage: storage,
  // 파일만 허용하도록 설정
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'survey') {
      cb(null, false); // JSON 데이터는 파일이 아닌 것으로 처리
    } else {
      cb(null, true); // 파일은 허용
    }
  },
});

router.post(
  '/',
  uploadMiddleware.fields([
    { name: 'mainImageUrl', maxCount: 1 },
    { name: 'imageUrl', maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      console.log('Request received on / endpoint.');
      console.log('req.body:', req.body);

      if (!req.body.survey) {
        return res.status(400).json({ message: 'No survey data provided' });
      }

      const parsedData = JSON.parse(req.body.survey);
      console.log('Parsed survey data:', parsedData);

      const surveyData = parsedData.survey;
      console.log('Extracted survey data:', surveyData);

      if (!Array.isArray(surveyData.questions)) {
        console.log('No questions array in surveyData');
        return res
          .status(400)
          .json({ message: 'Invalid survey data: No questions array' });
      }

      // 메인 이미지 URL 처리
      if (req.files['mainImageUrl'] && req.files['mainImageUrl'][0]) {
        surveyData.mainImageUrl = await uploadFileToS3(
          req.files['mainImageUrl'][0],
        );
      }

      const imageUploadPromises = surveyData.questions.map(
        async (question, index) => {
          // 클라이언트에서 'imageUrl[]'의 배열 형태로 이미지를 보냈다고 가정
          if (req.files['imageUrl'] && req.files['imageUrl'][index]) {
            const file = req.files['imageUrl'][index];
            question.imageUrl = await uploadFileToS3(file);
          }
          return Promise.resolve();
        },
      );

      // 모든 이미지 업로드가 완료되기를 기다립니다.
      await Promise.all(imageUploadPromises);

      // 설문 생성 로직 호출
      await surveyController.createSurveyWithQuestionsAndChoices(
        parsedData.survey, // 이 부분을 수정합니다.
        res,
      );
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(400).json({
        message: 'Error processing survey data',
        error: error.message,
      });
    }
  },
);

router.get('/:userId/answers/:surveyId', getAnswerController.getAnswerByuserId);
router.put(
  '/:id',
  uploadMiddleware.fields([
    { name: 'mainImageUrl', maxCount: 1 },
    { name: 'imageUrl', maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      console.log('Request received on PUT endpoint.');
      console.log('req.body:', req.body);

      if (!req.body.survey) {
        return res.status(400).json({
          message: '설문을 수정하는데 실패하였습니다.',
          resultCode: 400,
        });
      }

      const parsedData = JSON.parse(req.body.survey);
      console.log('Parsed survey data:', parsedData);

      const surveyData = {
        ...parsedData.survey,
        id: req.params.id, // surveyId 추가
      };
      console.log('Extracted survey data:', surveyData);

      // 클라이언트로부터 받은 파일 데이터를 처리
      if (req.files['mainImageUrl'] && req.files['mainImageUrl'][0]) {
        const mainImageFile = req.files['mainImageUrl'][0]; // 파일 객체 참조
        console.log('메인 이미지 파일 업로드 중');
        // 파일을 S3에 업로드하고 URL을 업데이트합니다.
        const updatedMainImageUrl = await uploadFileToS3(mainImageFile);
        console.log('메인 이미지 파일 업로드 완료: ', updatedMainImageUrl);
        // 업로드된 이미지 URL을 surveyData에 할당합니다.
        surveyData.mainImageUrl = updatedMainImageUrl;
      }

      // 개별 질문 이미지 처리
      if (surveyData.questions) {
        for (const [index, question] of surveyData.questions.entries()) {
          if (req.files['imageUrl'] && req.files['imageUrl'][index]) {
            const file = req.files['imageUrl'][index];
            question.imageUrl = await uploadFileToS3(file);
          } else {
            question.imageUrl = ''; // 이미지 파일이 전혀 업로드되지 않은 경우
          }
        }
      }

      // 설문 수정 로직 호출
      await surveyModifyController.ModifySurveyWithQuestionsAndChoices(
        surveyData,
        res,
      );
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(400).json({
        message: 'Error processing survey data',
        error: error.message,
      });
    }
  },
);

router.get('/:id/forms', surveyAllUserController.getUserSurveys);
router.get('/:id/join', surveyAnsweredController.surveyAnswered);
router.get('/:id/results', surveyResultController.surveyResult);
router.get('/:id', surveyGetController.getSurveyById);
router.get('/:id/all', showAllSurveysController.showAllSurveys);
router.delete('/:id', surveyDeleteController.deleteSurveyAndRelatedData);
router.post('/:id', surveyAnswerController.createAnswer);
router.get('/:id/urls', getSurveyUrlController.getUrl);
router.post('/:id/share', async (req, res) => {
  console.log('Request body:', req.body);
  const surveyId = req.params.id;
  const { emails } = req.body;

  if (!Array.isArray(emails)) {
    return res
      .status(400)
      .json({ message: 'emails 필드가 배열 형식이 아닙니다' });
  }

  try {
    const response = await sendSurveyEmailWithSurveyId(surveyId, emails);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || '서버 오류 발생' });
  }
});

router.get('/:id/list', getResultController.getResultsByResponses);
module.exports = router;
