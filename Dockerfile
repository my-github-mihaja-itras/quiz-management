FROM node:18-alpine

WORKDIR /src/app

RUN npm install --global pm2

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3002

USER node

CMD ["pm2-runtime", "npm", "--", "start"]
