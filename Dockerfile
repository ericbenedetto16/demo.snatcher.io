FROM node:14-stretch

WORKDIR /usr/src/app/gateway

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]