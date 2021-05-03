FROM node:14-stretch

WORKDIR /usr/src/app/shortner

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start"]