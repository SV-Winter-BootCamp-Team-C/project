FROM node
USER root

WORKDIR /frontend
COPY . ./
RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "dev" ]