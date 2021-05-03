FROM node:14-stretch

WORKDIR /usr/src/app/client/

# Set Up Client
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# Set Up Server
WORKDIR /usr/src/app/client/server/

RUN npm install

COPY ./server .

EXPOSE 3000

CMD ["npm", "start"]