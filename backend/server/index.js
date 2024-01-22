require('dotenv').config(); // 이 부분을 코드 맨 위로 옮기세요.
const express = require('express');
const app = express();
const port = process.env.NODE_DOCKER_PORT || 8000;
const YAML = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const specs = YAML.load(
  fs.readFileSync('./swagger/swaggerconfig.yaml', 'utf8'),
);
const { sequelize } = require('../models');
const { createAndDownloadExcel } = require('../excel/excelGengerate');
const { callChatGPT } = require('../gpt/gptAPI');
const surveyRouters = require('../routers/surveyRouter');
const userRouters = require('../routers/UserRouter');
const { getImageByAPI } = require('../controller/getImageBySearch');
const cors = require('cors');

let corsOptions = {
  origin: '*', // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 테이블 생성 완료');

    app.use('/api/surveys', surveyRouters);

    app.use('/api/users', userRouters);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.get('/api/surveys/downloadExcel/:surveyId', createAndDownloadExcel);

    app.get('/api/images/search/:query', getImageByAPI);

    app.post('/api/gpt-prompt', async (req, res) => {
      try {
        const userPrompt = req.body.prompt;

        let modifiedPrompt = userPrompt;

        if (userPrompt.includes('질문지 제목')) {
          // 질문지 제목에 대한 요청 처리
          modifiedPrompt += ' 3개의 버전의 질문지 제목을 만들어 주세요.';
        } else if (userPrompt.includes('질문지 보기')) {
          // 질문지 보기에 대한 요청 처리
          (modifiedPrompt +=
            ' 최대 4개의 질문지 보기를 만들어 주세요. 글 나오지 않고 내용만 나오게 해줘.'),
            '질문지 보기는 한줄씩 나왔으면 좋겠어';
        }

        const response = await callChatGPT(modifiedPrompt);

        // GPT 모델로부터의 응답 처리
        const questions = response.choices[0].message.content
          .split('\n')
          .map((question) => question.trim())
          .filter((question) => question.length > 0);

        // 배열 형태로 응답 반환
        res.json({ responses: questions });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    //callChatGPT();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('데이터베이스 테이블 생성 실패:', err.stack);
  });
