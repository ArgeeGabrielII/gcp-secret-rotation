FROM node:20-alpine3.18 as node

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN echo "Node: " && node -v

RUN echo "NPM: " && npm -v

CMD ["npm", "start"]