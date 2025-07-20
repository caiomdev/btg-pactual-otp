FROM node:22-alpine

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080
ENV PORT 8080

CMD ["node", "build/bin/server.js"]