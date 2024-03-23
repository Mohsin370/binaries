FROM node:20-alpine

WORKDIR /frontend

COPY  package.json .

RUN npm install

COPY . .

EXPOSE 5174

CMD ["npm","run" ,"dev"]