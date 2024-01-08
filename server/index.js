const express = require('express');
const app = express();
require('dotenv').config(); // 이 부분을 코드 맨 위로 옮기세요.

const port = process.env.NODE_DOCKER_PORT || 8000;
const YAML = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const specs = YAML.load(fs.readFileSync('./swagger/swaggerconfig.yaml', 'utf8'));
const { pg, createTablesFromFile } = require('../models/database');
const surveyRouters = require('../routers/serveyRouter');
app.use(express.json());

const initializeDatabase = async () => {
  try {
    const client = await pg.connect();
    await createTablesFromFile();
    client.release();
  } catch (err) {
    console.error('데이터베이스 연동 실패 또는 테이블 생성 오류:', err);
  }
};

initializeDatabase();

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/api', surveyRouters);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
