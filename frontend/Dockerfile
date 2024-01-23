FROM node:latest
USER root

WORKDIR /frontend
COPY . ./
RUN npm install -g typescript

EXPOSE 3001

# CMD [ "npm", "run", "dev" ]