FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN  npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]