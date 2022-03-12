FROM node:16.13
WORKDIR /Documents/Opus/opus-backend

COPY package.json /Documents/Opus/opus-backend/
RUN npm install

COPY . /Documents/Opus/opus-backend/
RUN npm run build

EXPOSE 3012

CMD ["npm", "start"]