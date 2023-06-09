videohosting
========
Fullstack Youtube-like online Video Hosting that is made with ReactJS + NestJS

Gallery
------------------

<img src="Media/1.png" width=100%>
<img src="Media/2.png" width=100%>
<img src="Media/3.png" width=100%>
<img src="Media/4.png" width=100%>
<img src="Media/5.png" width=100%>
<img src="Media/6.png" width=100%>

Table of Technologies
------------------
1. React 
2. NestJS (Backend Framework)
3. NodeJS
4. PostgreSQL (DB)
5. Docker

#### Run application
First of all, to start application without docker, you have to install NodeJS, PostgreSQL, configure .env files etc.
So better to install docker and run in application in production mode

    docker-compose build
    docker-compose up
    
Therefore you can still run application in dev mode:

    cd server
    npm i
    npm run start:dev


    cd client
    npm i 
    npm start

Website links:
    Docker container: localhost:80 (Nginx)
    Dev: localhost:3000 (React dev)
