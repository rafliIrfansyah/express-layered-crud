FROM node:14

WORKDIR /src

COPY package.json .

COPY package-lock.json .


RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]