//백엔드(서버) 시작페이지
const express = require("express");   //express설치해서 사용가능
const app = express();                //app에 사용할 express함수 불러오기
const port = 8000;  //원하는 포트로(3000,4000,5000)

app.get('/',(req,res) => {
  res.send('there');
})

app.listen(port,() => {
  console.log(`port 8000 start`)
})
