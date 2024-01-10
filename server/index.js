const express = require('express');
const app = express();
require('dotenv').config(); // 이 부분을 코드 맨 위로 옮기세요.
const port = process.env.NODE_DOCKER_PORT || 8000;
const YAML = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const specs = YAML.load(
  fs.readFileSync('./swagger/swaggerconfig.yaml', 'utf8'),
);
const { sequelize } = require('../models');
const {createAndDownloadExcel} = require('../excel/excelGengerate');

const surveyRouters = require('../routers/surveyRouter');
const userRouters = require('../routers/UserRouter');
app.use(express.json());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 테이블 생성 완료');

    app.use('/api/surveys', surveyRouters);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.get('/downloadExcel', createAndDownloadExcel);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('데이터베이스 테이블 생성 실패:', err.stack);
  });
