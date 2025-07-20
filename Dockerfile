FROM node:22-alpine

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN npm install

RUN npm run build

EXPOSE 3333

CMD ["node", "build/server.js"]