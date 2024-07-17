from node:22

WORKDIR /app

COPY package*.json ./

run npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]