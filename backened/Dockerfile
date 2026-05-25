FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=4000
ENV MONGO_URI=mongodb://mongo:27017/food-delivery

EXPOSE 4000

CMD ["node", "App.js"]
