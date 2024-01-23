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

    app.get('/api/images/search/거:query', getImageByAPI);

    app.post('/api/gpt-prompt', async (req, res) => {
      try {
        console.log(req);
        //make prompt
        let prompt = req.body.title + '라는 제목의 설문지를 만들려고 하는 데,';
        //제목 + type
        prompt += req.body.description + '이건 설문지의 설명이야. 설명은 응답할 때는 넣지 말아줘.';
        prompt += (req.body.content + '(이 문구랑은 최대한 다르고 비슷하게)라는 내용을 묻는');
        switch (req.body.type) {
          case 'MULTIPLE_CHOICE':
            prompt += '객관식 (선택지가 4개 있어) 문항을 하나 만들어줘';
            break;
          //서술형은 안 넣기로 함.
          /*
          case 'SUBJECTIVE_QUESTION':
            prompt += '서술형(응답자가 직접 답을 기입함) 문항을 하나 만들어줘';
            break;
          */
          case 'CHECKBOX':
            prompt += '객관식(선택지가 4개 있어) 문항을 하나 만들어줘. 그리고 이 문항은 여러개의 선지를 고를 수 있어.';
            break;
          case 'DROPDOWN':
            //to do: 드롭다운 뭘 해야 되는지 고민해 보기 (객관식이랑 똑같은 듯?)
            prompt += '객관식 (선택지가 4개 있어) 문항을 하나 만들어줘. 길이는 상관없어';
            break;
          default:
            assert(false, 'error: undefined type');
            break;
        }
        prompt += 
        '너의 답을 (문항: output\n선택지1: output\n선택지2: output\n선택지3: output\n선택지4: output) 이 양식에 맞추고, output 위치에 답을 넣어서 보내줘.';
        console.log(prompt);
        const response = await callChatGPT(prompt);
        console.log(response);

        console.assert(response != null, 'error: response is null');
        // GPT 모델로부터의 응답 처리 (일단 문항 + option으로)
        console.log(response.choices[0].message);
        const lines = response.choices[0].message.content.split('\n');
        console.log(lines);
        //string에서 한글도 문자 한개라 가정
        //첫째 줄은 무조건 제목인 듯?   
        var questIndex = 0;
        for (i = 0; i < lines.length; ++i) {
          if (lines[i].indexOf('문항:') != -1) {
            break;
          }
          questIndex++;
        }
        const question = lines[questIndex].substring(lines[questIndex].indexOf(' ') + 1, lines[questIndex].length).trimStart();
        console.log(question);

        const options = new Array(4);
        var zeroLengthCount = 0;
        var i = questIndex + 1;
        var count = 0;
        //느린 코드임 (조건문을 되도록이면 빼게 프롬포트를 바꿔보자)
        while (count < 4 && i < lines.length) {
          console.log(lines[i]);
          if (lines[i] != undefined && lines[i].length != 0) {
            var index = lines[i].indexOf(':');
            if (index != -1) {
              options[count] = lines[i].substring(index + 1,  lines[i].length).trimStart();
              ++count;
            }
          }
          ++i;
        }
        //choice option으로 변환하는 코드
        const choices = new Array(4);
        for (i = 0; i < 4; ++i) {
          choices[i] = ({ option: options[i]});
        }
        console.log(choices);
        res.status(200).json({ content: question, choices: choices});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('데이터베이스 테이블 생성 실패:', err.stack);
  });
