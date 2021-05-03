FROM node:14-stretch

WORKDIR /usr/src/app/tendies

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8082

CMD ["npm", "start"]