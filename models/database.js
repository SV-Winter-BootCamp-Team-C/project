const { Pool } = require('pg'); // 'pg' 모듈에서 Pool을 불러옴
const fs = require('fs');
const path = require('path');

// Pool 인스턴스를 생성하고 데이터베이스 정보를 환경변수에서 갸져옴
const pg = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTablesFromFile = async () => {
  try {
    const sqlFilePath = path.join(__dirname, 'db.sql'); // SQL 파일 경로
    const sqlQuery = fs.readFileSync(sqlFilePath, 'utf-8'); // 파일 내용 읽기

    await pg.query(sqlQuery); // 여기에서 쿼리문을 실행
    console.log('테이블 생성 완료');
  } catch (err) {
    console.error('테이블 생성 오류:', err);
    return; // 오류 발생 시 함수를 즉시 종료
  }
};




module.exports = {pg,createTablesFromFile};
