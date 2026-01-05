FROM node:24.12

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000