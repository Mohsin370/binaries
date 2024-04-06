FROM node:lts-alpine

WORKDIR /backend

COPY  package*.json .

RUN npm install 

RUN npm install -g sequelize-cli 

COPY . .

WORKDIR /backend/src

# RUN npx sequelize db:migrate
# RUN npx sequelize db:seed:all 



EXPOSE 5000

# CMD ["npm","run" , "migrate"]

CMD ["npm","run" , "build"]