FROM node:18.19.0-alpine

WORKDIR /frontend
COPY . ./
RUN npm cache clean --force
RUN npm install
RUN npm run build
