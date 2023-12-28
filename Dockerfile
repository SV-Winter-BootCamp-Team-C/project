#이미지를 어셈블하기 위해 호출할 수 있는 명령이 포함된 간단한 텍스트 파일
#이미지 빌드
FROM node:18-alpine
# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 파일을 /app 디렉토리로 복사
COPY package*.json /app/

# npm 패키지 설치
RUN npm install

# 나머지 프로젝트 파일들을 /app 디렉토리로 복사
COPY . /app

# 서버가 사용할 포트 번호를 지정
EXPOSE 8000

# 컨테이너가 시작될 때 실행할 명령어 설정
CMD ["npm", "start"]


#이미지를 생성
#docker build --tag=test .
#이미지를 기반으로 애플리케이션을 실행하는 컨테이너를 시작
#docker run -p 8080:8000 test
#왜 8080:8000인가