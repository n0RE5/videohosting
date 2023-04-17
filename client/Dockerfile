FROM node:17-alpine as reactimg

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

EXPOSE 3000

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=reactimg /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]