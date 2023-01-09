FROM node:16.18

WORKDIR /usr/src/app

ENV MYSQL_HOST=127.0.0.1
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DBNAME=todo4

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD [ "npm", "start" ]