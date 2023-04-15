FROM node:17-alpine 

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

COPY ./dist /app/dist

EXPOSE 5000

CMD ["npm", "run", "start:prod"]