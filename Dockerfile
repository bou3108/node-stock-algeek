FROM node:14.8


WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 5000

CMD ["npm","start"]