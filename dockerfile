FROM node:20-alpine

WORKDIR /app

COPY backened/package*.json ./
RUN npm ci --omit=dev

COPY backened/ ./

ENV PORT=4000
ENV MONGO_URI=mongodb://host.docker.internal:27017/food-delivery

EXPOSE 4000

CMD ["node", "App.js"]