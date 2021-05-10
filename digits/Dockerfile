FROM node:14-stretch

WORKDIR /usr/src/app/digits

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8083

CMD ["npm", "start"]